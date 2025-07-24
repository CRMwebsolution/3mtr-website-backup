/*
  # Fix Availability Calendar Tables

  1. Changes
    - Create simplified availability table
    - Set up proper RLS policies
    - Create indexes for performance
    - Grant necessary permissions

  2. Security
    - Enable RLS on all tables
    - Create appropriate policies for public and admin access
*/

-- Drop existing views and tables
DROP VIEW IF EXISTS public_availability;
DROP TABLE IF EXISTS availability CASCADE;

-- Create availability table
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

-- Create indexes
CREATE INDEX idx_availability_trailer_date ON availability(trailer_id, date);
CREATE INDEX idx_availability_date ON availability(date);

-- Grant permissions
GRANT ALL ON availability TO authenticated;
GRANT SELECT ON availability TO anon;