-- Drop existing materialized view
DROP MATERIALIZED VIEW IF EXISTS public_availability;

-- Recreate materialized view with proper permissions
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

-- Create unique index
CREATE UNIQUE INDEX idx_availability_composite 
ON public_availability(trailer_id, date);

-- Grant permissions
GRANT SELECT ON public_availability TO authenticated;
GRANT SELECT ON public_availability TO anon;

-- Refresh the view
REFRESH MATERIALIZED VIEW CONCURRENTLY public_availability;