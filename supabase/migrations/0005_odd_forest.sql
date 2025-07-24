/*
  # Add is_active column to trailers table

  1. Changes
    - Add is_active column to trailers table
    - Set default value to true
    - Update existing rows
  2. Security
    - No changes to existing policies
*/

-- Add is_active column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'trailers' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE trailers ADD COLUMN is_active boolean DEFAULT true;
  END IF;
END $$;

-- Update any existing rows to have is_active = true
UPDATE trailers SET is_active = true WHERE is_active IS NULL;