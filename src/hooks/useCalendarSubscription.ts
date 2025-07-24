import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCalendarState } from './useCalendarState';

export function useCalendarSubscription() {
  const supabase = useSupabaseClient();
  const { setIsUpdating } = useCalendarState();

  useEffect(() => {
    const tables = ['maintenance_records', 'bookings', 'trailers'];
    const channel = supabase.channel('calendar-changes');

    // Subscribe to all relevant tables
    tables.forEach(table => {
      channel.on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => {
          // Set updating state and refresh after a delay
          setIsUpdating(true);
          setTimeout(() => setIsUpdating(false), 2000);
        }
      );
    });

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Subscribed to calendar changes');
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, setIsUpdating]);
}