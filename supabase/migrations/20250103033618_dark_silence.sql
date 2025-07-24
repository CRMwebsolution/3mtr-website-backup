/*
  # Fix Trailer Management System

  1. Changes
    - Safely drop existing policies
    - Recreate trailers table with proper structure
    - Set up availability tracking
    - Configure proper permissions

  2. Security
    - Enable RLS on all tables
    - Create appropriate policies for public and admin access
*/

-- Drop existing policies safely
DO $$ 
BEGIN
  -- Drop trailer policies if they exist
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'trailers' AND policyname = 'Public can view active trailers'
  ) THEN
    DROP POLICY "Public can view active trailers" ON trailers;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'trailers' AND policyname = 'Admins can manage trailers'
  ) THEN
    DROP POLICY "Admins can manage trailers" ON trailers;
  END IF;
END $$;

-- Ensure trailers table exists with proper structure
CREATE TABLE IF NOT EXISTS trailers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  size text,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on trailers
ALTER TABLE trailers ENABLE ROW LEVEL SECURITY;

-- Create new policies for trailers
CREATE POLICY "Public can view active trailers"
  ON trailers FOR SELECT
  TO PUBLIC
  USING (is_active = true);

CREATE POLICY "Admins can manage trailers"
  ON trailers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Drop existing availability table and recreate
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

-- Enable RLS on availability
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create policies for availability
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_availability_trailer_date 
  ON availability(trailer_id, date);

CREATE INDEX IF NOT EXISTS idx_availability_date 
  ON availability(date);

-- Grant necessary permissions
GRANT ALL ON trailers TO authenticated;
GRANT ALL ON availability TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;