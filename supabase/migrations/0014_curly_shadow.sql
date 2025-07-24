-- Create a function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_availability_view()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public_availability;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Ensure triggers exist and are properly configured
DROP TRIGGER IF EXISTS refresh_availability_maintenance ON maintenance_records;
CREATE TRIGGER refresh_availability_maintenance
AFTER INSERT OR UPDATE OR DELETE ON maintenance_records
FOR EACH STATEMENT EXECUTE FUNCTION refresh_availability_view();

DROP TRIGGER IF EXISTS refresh_availability_bookings ON bookings;
CREATE TRIGGER refresh_availability_bookings
AFTER INSERT OR UPDATE OR DELETE ON bookings
FOR EACH STATEMENT EXECUTE FUNCTION refresh_availability_view();

DROP TRIGGER IF EXISTS refresh_availability_trailers ON trailers;
CREATE TRIGGER refresh_availability_trailers
AFTER INSERT OR UPDATE OR DELETE ON trailers
FOR EACH STATEMENT EXECUTE FUNCTION refresh_availability_view();

-- Refresh the view initially
REFRESH MATERIALIZED VIEW CONCURRENTLY public_availability;