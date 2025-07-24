/*
  # Add realtime triggers for calendar updates

  1. Changes
    - Add triggers for maintenance_records and bookings
    - Enable realtime for base tables
    - Create notification function
  
  2. Security
    - Ensure proper access control
*/

-- Enable realtime for base tables
ALTER PUBLICATION supabase_realtime ADD TABLE maintenance_records;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE trailers;

-- Create function to notify clients of changes
CREATE OR REPLACE FUNCTION notify_calendar_changes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'calendar_updates',
    json_build_object(
      'table', TG_TABLE_NAME,
      'type', TG_OP,
      'id', COALESCE(NEW.id, OLD.id)
    )::text
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for maintenance records
DROP TRIGGER IF EXISTS maintenance_calendar_trigger ON maintenance_records;
CREATE TRIGGER maintenance_calendar_trigger
  AFTER INSERT OR UPDATE OR DELETE ON maintenance_records
  FOR EACH ROW EXECUTE FUNCTION notify_calendar_changes();

-- Create triggers for bookings
DROP TRIGGER IF EXISTS booking_calendar_trigger ON bookings;
CREATE TRIGGER booking_calendar_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION notify_calendar_changes();

-- Create triggers for trailers
DROP TRIGGER IF EXISTS trailer_calendar_trigger ON trailers;
CREATE TRIGGER trailer_calendar_trigger
  AFTER INSERT OR UPDATE OR DELETE ON trailers
  FOR EACH ROW EXECUTE FUNCTION notify_calendar_changes();

-- Ensure proper indexes exist
CREATE INDEX IF NOT EXISTS idx_maintenance_dates 
  ON maintenance_records(start_date, end_date);
  
CREATE INDEX IF NOT EXISTS idx_booking_dates 
  ON bookings(start_date, end_date);

-- Grant necessary permissions
GRANT SELECT ON public_availability TO authenticated, anon;