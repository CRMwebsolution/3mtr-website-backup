/*
  # Calendar and Maintenance System Update

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `trailer_id` (uuid, foreign key)
      - `start_date` (date)
      - `end_date` (date)
      - `status` (text)
      - `customer_name` (text)
      - `customer_email` (text)
      - `notes` (text)
      - timestamps

  2. Security
    - Enable RLS on new tables
    - Add policies for public viewing and admin management
    - Fix existing availability policies

  3. Changes
    - Add indexes for performance
    - Add constraints for data integrity
*/

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trailer_id uuid REFERENCES trailers(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date >= start_date)
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public booking policies
CREATE POLICY "Public can view confirmed bookings"
  ON bookings
  FOR SELECT
  TO PUBLIC
  USING (status = 'confirmed');

-- Admin booking policies
CREATE POLICY "Admins can manage all bookings"
  ON bookings
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

-- Create indexes
CREATE INDEX IF NOT EXISTS bookings_trailer_id_idx ON bookings(trailer_id);
CREATE INDEX IF NOT EXISTS bookings_dates_idx ON bookings(start_date, end_date);

-- Update availability view
CREATE OR REPLACE VIEW public_availability AS
SELECT 
  t.id as trailer_id,
  t.name as trailer_name,
  d.date,
  COALESCE(
    CASE 
      WHEN m.id IS NOT NULL THEN 'maintenance'
      WHEN b.id IS NOT NULL THEN 'unavailable'
      ELSE 'available'
    END,
    'available'
  ) as status
FROM trailers t
CROSS JOIN generate_series(
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '90 days',
  INTERVAL '1 day'
) d(date)
LEFT JOIN maintenance_records m ON 
  t.id = m.trailer_id AND 
  d.date BETWEEN m.start_date AND m.end_date
LEFT JOIN bookings b ON 
  t.id = b.trailer_id AND 
  d.date BETWEEN b.start_date AND b.end_date AND 
  b.status = 'confirmed'
WHERE t.is_active = true;