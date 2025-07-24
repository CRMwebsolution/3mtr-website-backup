/*
  # Fix Trailer Active Status

  1. Changes
    - Set default is_active value for existing trailers
    - Add constraint to ensure is_active is not null
  
  2. Security
    - No changes to security policies
*/

-- Ensure all existing trailers have is_active set
UPDATE trailers 
SET is_active = true 
WHERE is_active IS NULL;

-- Add not null constraint
ALTER TABLE trailers 
ALTER COLUMN is_active SET NOT NULL,
ALTER COLUMN is_active SET DEFAULT true;