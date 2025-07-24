/*
  # Fix Admin Policies

  1. Changes
    - Update audit_logs policy to allow inserts without RLS check
    - Fix audit trigger function to handle unauthenticated inserts
    - Add missing policies for admin access
*/

-- Drop existing audit policies
DROP POLICY IF EXISTS "Admins can insert audit logs" ON audit_logs;
DROP POLICY IF EXISTS "Admins can view audit logs" ON audit_logs;

-- Create new audit policies
CREATE POLICY "Allow all inserts to audit_logs"
  ON audit_logs
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view audit_logs"
  ON audit_logs
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin'
    )
  );

-- Update the audit trigger function to handle null auth.uid()
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS trigger AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    changes
  )
  VALUES (
    COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid),
    TG_OP,
    TG_TABLE_NAME,
    CASE
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END,
    CASE
      WHEN TG_OP = 'INSERT' THEN to_jsonb(NEW)
      WHEN TG_OP = 'UPDATE' THEN jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW))
      WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)
    END
  );
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;