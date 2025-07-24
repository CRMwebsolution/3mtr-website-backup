import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { format } from 'date-fns';

export function useAdminAvailability() {
  const supabase = useSupabaseClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateAvailability = async (
    trailerId: string, 
    date: Date, 
    status: 'available' | 'unavailable'
  ) => {
    setIsUpdating(true);
    
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');

      if (status === 'available') {
        // Delete any existing record to mark as available
        await supabase
          .from('availability')
          .delete()
          .match({ 
            trailer_id: trailerId,
            date: formattedDate 
          });
      } else {
        // Upsert record to mark as unavailable
        await supabase
          .from('availability')
          .upsert({
            trailer_id: trailerId,
            date: formattedDate,
            status: 'unavailable'
          });
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
    isUpdating
  };
}