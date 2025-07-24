-- Create policies that allow authenticated users to access data
CREATE POLICY "Allow authenticated access to trailers"
ON trailers FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated access to maintenance_records"
ON maintenance_records FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated access to bookings"
ON bookings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated access to admin_users"
ON admin_users FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated access to audit_logs"
ON audit_logs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Grant select permissions to anon for public_availability
GRANT SELECT ON public_availability TO anon;

-- Refresh the materialized view
REFRESH MATERIALIZED VIEW public_availability;