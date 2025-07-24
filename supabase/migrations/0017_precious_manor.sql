/*
  # Enable Full Permissions for Calendar System

  1. Changes
    - Grant full permissions to authenticated users
    - Enable RLS policies for all tables
    - Fix materialized view permissions
    - Add missing table permissions

  2. Security
    - Maintain RLS while enabling necessary access
    - Keep audit logging intact
*/

-- Grant full access to authenticated users for calendar-related tables
GRANT ALL ON trailers TO authenticated;
GRANT ALL ON maintenance_records TO authenticated;
GRANT ALL ON bookings TO authenticated;
GRANT ALL ON admin_users TO authenticated;
GRANT ALL ON audit_logs TO authenticated;

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Ensure public_availability view is accessible
GRANT SELECT ON public_availability TO authenticated;
GRANT SELECT ON public_availability TO anon;

-- Allow authenticated users to refresh the materialized view
GRANT ALL ON public_availability TO authenticated;

-- Update RLS policies for trailers
DROP POLICY IF EXISTS "Admins can manage trailers" ON trailers;
CREATE POLICY "Admins can manage trailers"
  ON trailers
  USING (true)
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Update RLS policies for maintenance_records
DROP POLICY IF EXISTS "Admins can manage maintenance" ON maintenance_records;
CREATE POLICY "Admins can manage maintenance"
  ON maintenance_records
  USING (true)
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Update RLS policies for bookings
DROP POLICY IF EXISTS "Admins can manage all bookings" ON bookings;
CREATE POLICY "Admins can manage all bookings"
  ON bookings
  USING (true)
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Ensure refresh function has proper permissions
ALTER FUNCTION refresh_availability_view() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION refresh_availability_view() TO authenticated;

-- Refresh the materialized view
REFRESH MATERIALIZED VIEW CONCURRENTLY public_availability;