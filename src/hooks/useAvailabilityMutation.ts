import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { AvailabilityStatus } from '../types/availability';
import { useCalendarState } from './useCalendarState';

export function useAvailabilityMutation() {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { setIsUpdating } = useCalendarState();

  const updateAvailability = async (
    trailerId: string,
    date: string,
    status: AvailabilityStatus,
    notes?: string
  ) => {
    setIsLoading(true);
    setError(null);
    setIsUpdating(true);

    try {
      if (status === 'maintenance') {
        const { error: maintenanceError } = await supabase
          .from('maintenance_records')
          .upsert({
            trailer_id: trailerId,
            start_date: date,
            end_date: date,
            description: notes || 'Scheduled maintenance',
            status: 'in_progress'
          });

        if (maintenanceError) throw maintenanceError;
      } else if (status === 'unavailable') {
        const { error: bookingError } = await supabase
          .from('bookings')
          .upsert({
            trailer_id: trailerId,
            start_date: date,
            end_date: date,
            status: 'confirmed',
            customer_name: 'BLOCKED',
            customer_email: 'blocked@system',
            notes: notes || 'Manually blocked'
          });

        if (bookingError) throw bookingError;
      } else {
        // Clear any existing blocks
        await Promise.all([
          supabase
            .from('maintenance_records')
            .delete()
            .eq('trailer_id', trailerId)
            .eq('start_date', date),
          supabase
            .from('bookings')
            .delete()
            .eq('trailer_id', trailerId)
            .eq('start_date', date)
            .eq('customer_email', 'blocked@system')
        ]);
      }

      // Wait for view refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update availability');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
      setIsUpdating(false);
    }
  };

  return {
    updateAvailability,
    isLoading,
    error
  };
}