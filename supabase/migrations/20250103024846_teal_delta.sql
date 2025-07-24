-- Drop existing view and table
DROP VIEW IF EXISTS public_availability;
DROP TABLE IF EXISTS availability CASCADE;

-- Create availability table with proper constraints
CREATE TABLE availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trailer_id uuid NOT NULL REFERENCES trailers(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('available', 'unavailable')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_trailer_date UNIQUE (trailer_id, date)
);

-- Enable RLS
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view availability"
  ON availability FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Admins can manage availability"
  ON availability FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create view for public availability
CREATE VIEW public_availability AS
SELECT 
  t.id as trailer_id,
  t.name as trailer_name,
  t.type,
  d.date,
  COALESCE(a.status, 'available') as status
FROM trailers t
CROSS JOIN generate_series(
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '90 days',
  INTERVAL '1 day'
) d(date)
LEFT JOIN availability a ON 
  t.id = a.trailer_id AND 
  d.date = a.date
WHERE t.is_active = true;

-- Create indexes for better performance
CREATE INDEX idx_availability_trailer_date ON availability(trailer_id, date);
CREATE INDEX idx_availability_date ON availability(date);

-- Grant necessary permissions
GRANT ALL ON availability TO authenticated;
GRANT SELECT ON public_availability TO authenticated;
GRANT SELECT ON public_availability TO anon;