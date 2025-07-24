-- Drop existing policies that may cause recursion
DROP POLICY IF EXISTS "Allow admins to read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow users to insert their own admin record" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to update their own record" ON admin_users;

-- Create new non-recursive policies
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

CREATE POLICY "Admins can update their own record"
  ON admin_users
  FOR UPDATE
  USING (
    auth.uid() = id
  )
  WITH CHECK (
    auth.uid() = id AND
    role = 'admin'
  );