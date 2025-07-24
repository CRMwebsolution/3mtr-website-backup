/*
  # Fix Calendar View Functionality

  1. Changes
    - Add materialized view for better performance
    - Add refresh function and trigger
    - Update public_availability view
  
  2. Security
    - Grant necessary permissions
*/

-- Drop existing view
DROP VIEW IF EXISTS public_availability;

-- Create materialized view for better performance
CREATE MATERIALIZED VIEW public_availability AS
SELECT 
  t.id as trailer_id,
  t.name as trailer_name,
  d.date,
  COALESCE(
    CASE 
      WHEN m.id IS NOT NULL THEN 'maintenance'::text
      WHEN b.id IS NOT NULL THEN 'unavailable'::text
      ELSE 'available'::text
    END,
    'available'::text
  ) as status
FROM trailers t
CROSS JOIN generate_series(
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '90 days',
  INTERVAL '1 day'
) d(date)
LEFT JOIN maintenance_records m ON 
  t.id = m.trailer_id AND 
  d.date BETWEEN m.start_date AND m.end_date AND
  m.status != 'completed'
LEFT JOIN bookings b ON 
  t.id = b.trailer_id AND 
  d.date BETWEEN b.start_date AND b.end_date AND 
  b.status = 'confirmed'
WHERE t.is_active = true;

-- Create index for better query performance
CREATE UNIQUE INDEX idx_availability_composite 
ON public_availability(trailer_id, date);

-- Create function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_availability_view()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public_availability;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to refresh view
CREATE TRIGGER refresh_availability_maintenance
AFTER INSERT OR UPDATE OR DELETE ON maintenance_records
FOR EACH STATEMENT EXECUTE FUNCTION refresh_availability_view();

CREATE TRIGGER refresh_availability_bookings
AFTER INSERT OR UPDATE OR DELETE ON bookings
FOR EACH STATEMENT EXECUTE FUNCTION refresh_availability_view();

CREATE TRIGGER refresh_availability_trailers
AFTER INSERT OR UPDATE OR DELETE ON trailers
FOR EACH STATEMENT EXECUTE FUNCTION refresh_availability_view();

-- Grant permissions
GRANT SELECT ON public_availability TO authenticated, anon;