import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from './useAuth';

export function useAvailabilityManagement() {
  const supabase = useSupabaseClient();
  const { isAdmin } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateAvailability = async (
    trailerId: string, 
    date: Date, 
    status: 'available' | 'unavailable'
  ) => {
    if (!isAdmin) {
      throw new Error('Unauthorized: Only admins can update availability');
    }

    setIsUpdating(true);
    
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');

      if (status === 'available') {
        const { error: deleteError } = await supabase
          .from('availability')
          .delete()
          .match({ 
            trailer_id: trailerId,
            date: formattedDate 
          });

        if (deleteError) throw deleteError;
      } else {
        const { error: upsertError } = await supabase
          .from('availability')
          .upsert({
            trailer_id: trailerId,
            date: formattedDate,
            status: 'unavailable'
          });

        if (upsertError) throw upsertError;
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateAvailability,
    isUpdating,
    isAdmin
  };
}