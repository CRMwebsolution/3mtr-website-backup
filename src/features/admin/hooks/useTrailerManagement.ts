import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { Trailer } from '../../../types/availability';

export function useTrailerManagement() {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createTrailer = async (trailerData: Omit<Trailer, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('trailers')
        .insert([trailerData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create trailer'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTrailer = async (id: string, updates: Partial<Trailer>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('trailers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update trailer'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTrailer = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('trailers')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete trailer'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTrailer,
    updateTrailer,
    deleteTrailer,
    isLoading,
    error
  };
}