import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface Trailer {
  id: string;
  name: string;
  type: string;
  size?: string;
  description?: string;
  is_active: boolean;
}

export function useTrailers() {
  const supabase = useSupabaseClient();
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTrailers() {
      try {
        const { data, error } = await supabase
          .from('trailers')
          .select('*')
          .order('name');

        if (error) throw error;
        setTrailers(data || []);
      } catch (err) {
        console.error('Error fetching trailers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trailers'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrailers();

    // Subscribe to changes
    const subscription = supabase
      .channel('trailers')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'trailers' 
      }, fetchTrailers)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { trailers, isLoading, error };
}