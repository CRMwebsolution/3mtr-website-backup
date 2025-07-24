-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view availability" ON availability;
DROP POLICY IF EXISTS "Anyone can manage availability" ON availability;

-- Recreate availability table with simpler structure
DROP TABLE IF EXISTS availability CASCADE;
CREATE TABLE availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trailer_id uuid REFERENCES trailers(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('available', 'unavailable')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(trailer_id, date)
);

-- Enable RLS
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create simpler policies that allow all authenticated users to manage availability
CREATE POLICY "Anyone can view availability"
  ON availability FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage availability"
  ON availability FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT ALL ON availability TO authenticated;
GRANT SELECT ON availability TO anon;