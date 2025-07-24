/*
  # Fix Trailer Management System

  1. Changes
    - Drop problematic views and recreate tables
    - Set up proper structure for trailers
    - Configure RLS policies
    - Grant necessary permissions

  2. Security
    - Enable RLS on all tables
    - Create appropriate policies for public and admin access
*/

-- Drop existing view if it exists
DROP VIEW IF EXISTS public_availability;

-- Ensure trailers table exists with proper structure
CREATE TABLE IF NOT EXISTS trailers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  size text,
  description text,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on trailers
ALTER TABLE trailers ENABLE ROW LEVEL SECURITY;

-- Create policies for trailers
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'trailers' AND policyname = 'Public can view active trailers'
  ) THEN
    CREATE POLICY "Public can view active trailers"
      ON trailers FOR SELECT
      TO PUBLIC
      USING (is_active = true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'trailers' AND policyname = 'Admins can manage trailers'
  ) THEN
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
  END IF;
END $$;

-- Create indexes for trailers
CREATE INDEX IF NOT EXISTS idx_trailers_is_active ON trailers(is_active);
CREATE INDEX IF NOT EXISTS idx_trailers_type ON trailers(type);

-- Grant necessary permissions
GRANT ALL ON trailers TO authenticated;
GRANT SELECT ON trailers TO anon;