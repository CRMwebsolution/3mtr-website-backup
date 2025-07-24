import { useState, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  format
} from 'date-fns';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { CalendarDay, TrailerAvailability } from '../types/calendar';

export function useCalendarData(date: Date, view: 'month' | 'week' = 'month') {
  const supabase = useSupabaseClient();
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);

        // Calculate date range
        const start = view === 'month' 
          ? startOfWeek(startOfMonth(date))
          : startOfWeek(date);
        
        const end = view === 'month'
          ? endOfWeek(endOfMonth(date))
          : endOfWeek(date);

        // Fetch trailers and their availability
        const { data: trailers, error: trailersError } = await supabase
          .from('trailers')
          .select('id, name, type, size')
          .eq('is_active', true);

        if (trailersError) throw trailersError;

        const { data: unavailable, error: availabilityError } = await supabase
          .from('availability')
          .select('trailer_id, date')
          .eq('status', 'unavailable')
          .gte('date', format(start, 'yyyy-MM-dd'))
          .lte('date', format(end, 'yyyy-MM-dd'));

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

        // Generate calendar days
        const calendarDays = eachDayOfInterval({ start, end }).map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const unavailableSet = unavailableMap.get(dateStr) || new Set();

          const dayTrailers: TrailerAvailability[] = trailers?.map(trailer => ({
            id: trailer.id,
            name: trailer.name,
            type: trailer.type,
            size: trailer.size,
            status: unavailableSet.has(trailer.id) ? 'unavailable' : 'available'
          })) || [];

          return {
            date: day,
            isCurrentMonth: isSameMonth(day, date),
            trailers: dayTrailers
          };
        });

        setDays(calendarDays);
        setError(null);
      } catch (err) {
        console.error('Error fetching calendar data:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch calendar data'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [supabase, date, view]);

  return { days, isLoading, error };
}