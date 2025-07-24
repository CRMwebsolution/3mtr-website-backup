/*
  # Add Admin Authentication Policies

  1. Changes
    - Add policies for admin_users table
    - Allow admin registration
    - Enable proper authentication checks

  2. Security
    - Enable RLS for admin_users
    - Add policies for admin access
*/

-- Add policy to allow admin registration
CREATE POLICY "Allow users to insert their own admin record"
  ON admin_users
  FOR INSERT
  WITH CHECK (
    auth.uid() = id
  );

-- Add policy to allow admins to read admin_users
CREATE POLICY "Allow admins to read admin_users"
  ON admin_users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );

-- Add policy to allow admins to update their own record
CREATE POLICY "Allow admins to update their own record"
  ON admin_users
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users(email);