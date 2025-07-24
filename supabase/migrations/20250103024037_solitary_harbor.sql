-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Public can read admin emails" ON admin_users;
DROP POLICY IF EXISTS "Users can insert their own admin record" ON admin_users;

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role = 'admin'),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Public can read admin emails"
  ON admin_users
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own admin record"
  ON admin_users
  FOR INSERT
  WITH CHECK (
    auth.uid() = id AND
    role = 'admin'
  );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT ALL ON admin_users TO authenticated;
GRANT ALL ON admin_users TO service_role;

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users(email);