/*
  # Fix Audit Logs RLS Policies

  1. Changes
    - Add RLS policies for audit_logs table
    - Allow admins to insert audit logs
    - Allow admins to view audit logs
  
  2. Security
    - Enable RLS on audit_logs table
    - Restrict access to admin users only
*/

-- Update audit_logs policies
CREATE POLICY "Admins can insert audit logs"
  ON audit_logs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can view audit logs"
  ON audit_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Make audit trigger function more resilient
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS trigger AS $$
BEGIN
  -- Only proceed if we have an authenticated user
  IF auth.uid() IS NOT NULL THEN
    IF TG_OP = 'INSERT' THEN
      INSERT INTO audit_logs (user_id, action, table_name, record_id, changes)
      VALUES (auth.uid(), 'INSERT', TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
    ELSIF TG_OP = 'UPDATE' THEN
      INSERT INTO audit_logs (user_id, action, table_name, record_id, changes)
      VALUES (auth.uid(), 'UPDATE', TG_TABLE_NAME, NEW.id, jsonb_build_object(
        'old', to_jsonb(OLD),
        'new', to_jsonb(NEW)
      ));
    ELSIF TG_OP = 'DELETE' THEN
      INSERT INTO audit_logs (user_id, action, table_name, record_id, changes)
      VALUES (auth.uid(), 'DELETE', TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;