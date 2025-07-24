/*
  # Add Public Availability View
  
  Creates an optimized view for public availability data that:
  - Only shows active trailers
  - Combines maintenance and booking status
  - Pre-calculates availability for the next 90 days
*/

CREATE OR REPLACE VIEW public_availability AS
SELECT 
  t.id as trailer_id,
  t.name as trailer_name,
  d.date,
  COALESCE(
    CASE 
      WHEN m.id IS NOT NULL THEN 'maintenance'
      WHEN b.id IS NOT NULL THEN 'unavailable'
      ELSE 'available'
    END,
    'available'
  ) as status
FROM trailers t
CROSS JOIN generate_series(
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '90 days',
  INTERVAL '1 day'
) d(date)
LEFT JOIN maintenance_records m ON 
  t.id = m.trailer_id AND 
  d.date BETWEEN m.start_date AND m.end_date
LEFT JOIN bookings b ON 
  t.id = b.trailer_id AND 
  d.date BETWEEN b.start_date AND b.end_date AND 
  b.status = 'confirmed'
WHERE t.is_active = true;