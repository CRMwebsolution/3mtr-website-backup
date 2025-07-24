-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view availability" ON availability;
DROP POLICY IF EXISTS "Authenticated users can manage availability" ON availability;
DROP POLICY IF EXISTS "Public can view availability" ON availability;
DROP POLICY IF EXISTS "Admins can manage availability" ON availability;

-- Recreate availability table with proper structure
DROP TABLE IF EXISTS availability CASCADE;
CREATE TABLE availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trailer_id uuid REFERENCES trailers(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('available', 'unavailable')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_trailer_date UNIQUE (trailer_id, date)
);

-- Enable RLS
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create new policies with proper permissions
CREATE POLICY "Anyone can view availability"
  ON availability FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Authenticated users can manage availability"
  ON availability FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_availability_trailer_date 
  ON availability(trailer_id, date);
CREATE INDEX IF NOT EXISTS idx_availability_date 
  ON availability(date);

-- Grant necessary permissions
GRANT ALL ON availability TO authenticated;
GRANT SELECT ON availability TO anon;

-- Ensure admin user exists
INSERT INTO admin_users (id, email, role)
SELECT id, email, 'admin'
FROM auth.users 
WHERE email = 'cody@3mtrailerrental.com'
ON CONFLICT (email) DO NOTHING;