import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { format } from 'date-fns';
import type { TrailerAvailability } from '../types/calendar';

export function useAvailability(startDate: Date, endDate: Date) {
  const supabase = useSupabaseClient();
  const [data, setData] = useState<TrailerAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchAvailability() {
      try {
        const { data: trailers, error: trailersError } = await supabase
          .from('trailers')
          .select('id, name, type, size')
          .eq('is_active', true);

        if (trailersError) throw trailersError;

        const { data: unavailable, error: availabilityError } = await supabase
          .from('availability')
          .select('trailer_id, date')
          .eq('status', 'unavailable')
          .gte('date', format(startDate, 'yyyy-MM-dd'))
          .lte('date', format(endDate, 'yyyy-MM-dd'));

        if (availabilityError) throw availabilityError;

        if (!mounted) return;

        // Create availability map
        const unavailableMap = new Map();
        unavailable?.forEach(record => {
          if (!unavailableMap.has(record.date)) {
            unavailableMap.set(record.date, new Set());
          }
          unavailableMap.get(record.date).add(record.trailer_id);
        });

        // Convert trailers to availability records
        const availability = trailers?.map(trailer => ({
          id: trailer.id,
          name: trailer.name,
          type: trailer.type,
          size: trailer.size,
          status: 'available' as const
        })) || [];

        setData(availability);
        setError(null);
      } catch (err) {
        console.error('Error fetching availability:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch availability'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAvailability();

    return () => {
      mounted = false;
    };
  }, [supabase, startDate, endDate]);

  return { data, isLoading, error };
}