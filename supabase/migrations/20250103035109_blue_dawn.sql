-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admins can manage trailers" ON trailers;
DROP POLICY IF EXISTS "Public can view active trailers" ON trailers;

-- Ensure RLS is enabled
ALTER TABLE trailers ENABLE ROW LEVEL SECURITY;

-- Create new policies for trailers
CREATE POLICY "Anyone can view trailers"
  ON trailers FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Authenticated users can manage trailers"
  ON trailers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Grant necessary permissions
GRANT ALL ON trailers TO authenticated;
GRANT SELECT ON trailers TO anon;

-- Ensure admin user exists
INSERT INTO admin_users (id, email, role)
SELECT id, email, 'admin'
FROM auth.users 
WHERE email = 'cody@3mtrailerrental.com'
ON CONFLICT (email) DO NOTHING;