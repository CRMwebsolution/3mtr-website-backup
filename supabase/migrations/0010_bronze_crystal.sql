/*
  # Add Initial Admin User
  
  1. Changes
    - Adds initial admin user record
    - Ensures admin user exists in auth.users
  
  2. Security
    - Uses secure password hashing
    - Maintains RLS policies
*/

-- Create the admin user in auth.users if it doesn't exist
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  'cody@3mtrailerrental.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'cody@3mtrailerrental.com'
);

-- Add the user to admin_users table
INSERT INTO admin_users (
  id,
  email,
  role
)
SELECT 
  id,
  email,
  'admin'
FROM auth.users 
WHERE email = 'cody@3mtrailerrental.com'
ON CONFLICT (email) DO NOTHING;