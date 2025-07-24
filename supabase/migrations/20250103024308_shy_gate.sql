-- Drop existing materialized view and policies
DROP MATERIALIZED VIEW IF EXISTS public_availability;
DROP POLICY IF EXISTS "Public can view availability" ON availability;
DROP POLICY IF EXISTS "Admins can manage availability" ON availability;

-- Create a new table for availability if it doesn't exist
CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trailer_id uuid REFERENCES trailers(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('available', 'unavailable')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create unique constraint for trailer_id and date combination
ALTER TABLE availability 
  DROP CONSTRAINT IF EXISTS unique_trailer_date,
  ADD CONSTRAINT unique_trailer_date UNIQUE (trailer_id, date);

-- Enable RLS if not already enabled
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create new policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'availability' AND policyname = 'Public can view availability'
  ) THEN
    CREATE POLICY "Public can view availability"
      ON availability FOR SELECT
      TO PUBLIC
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'availability' AND policyname = 'Admins can manage availability'
  ) THEN
    CREATE POLICY "Admins can manage availability"
      ON availability FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM admin_users
          WHERE id = auth.uid()
          AND role = 'admin'
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM admin_users
          WHERE id = auth.uid()
          AND role = 'admin'
        )
      );
  END IF;
END $$;

-- Create view for public availability
CREATE VIEW public_availability AS
SELECT 
  t.id as trailer_id,
  t.name as trailer_name,
  t.type,
  COALESCE(a.date, d.date) as date,
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