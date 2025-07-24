/*
  # Update admin policies

  1. Changes
    - Add policies for admin CRUD operations on trailers table
    - Add policies for admin CRUD operations on availability table
    - Add policies for admin CRUD operations on maintenance_records table

  2. Security
    - Policies check for admin role in admin_users table
    - Maintains existing public read access where appropriate
*/

-- Update trailer policies
CREATE POLICY "Admins can manage trailers"
  ON trailers
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

-- Update availability policies
CREATE POLICY "Admins can manage availability"
  ON availability
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

-- Update maintenance policies
CREATE POLICY "Admins can manage maintenance"
  ON maintenance_records
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

-- Create storage bucket for trailer images if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('trailer-images', 'trailer-images')
ON CONFLICT (id) DO NOTHING;

-- Allow public access to trailer images
CREATE POLICY "Public can view trailer images"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'trailer-images' );

-- Allow admins to manage trailer images
CREATE POLICY "Admins can manage trailer images"
  ON storage.objects
  USING (
    bucket_id = 'trailer-images' AND
    EXISTS (
      SELECT 1 FROM auth.users
      JOIN admin_users ON admin_users.id = auth.users.id
      WHERE auth.users.id = auth.uid()
      AND admin_users.role = 'admin'
    )
  )
  WITH CHECK (
    bucket_id = 'trailer-images' AND
    EXISTS (
      SELECT 1 FROM auth.users
      JOIN admin_users ON admin_users.id = auth.users.id
      WHERE auth.users.id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );