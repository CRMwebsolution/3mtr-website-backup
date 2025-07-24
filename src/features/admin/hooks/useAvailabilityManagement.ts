import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { AvailabilityStatus } from '../../../types/availability';

export function useAvailabilityManagement() {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateAvailability = async (
    trailerId: string,
    date: string,
    status: AvailabilityStatus,
    notes?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('availability')
        .upsert({
          trailer_id: trailerId,
          date,
          status,
          notes,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'trailer_id,date'
        });

      if (updateError) throw updateError;

      // Broadcast the change through Supabase realtime
      await supabase
        .channel('availability-changes')
        .send({
          type: 'broadcast',
          event: 'availability_update',
          payload: { trailer_id: trailerId, date, status }
        });

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update availability');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateAvailability,
    isLoading,
    error
  };
}