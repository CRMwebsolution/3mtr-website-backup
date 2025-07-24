import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { PostgrestError } from '@supabase/supabase-js';

interface UseSupabaseQueryOptions {
  retryCount?: number;
  retryDelay?: number;
  realtimeEnabled?: boolean;
}

export function useSupabaseQuery<T>(
  queryFn: (supabase: ReturnType<typeof useSupabaseClient>) => Promise<{ data: T | null; error: PostgrestError | null }>,
  options: UseSupabaseQueryOptions = {}
) {
  const { retryCount = 3, retryDelay = 1000, realtimeEnabled = false } = options;
  const supabase = useSupabaseClient();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let attempts = 0;

    async function executeQuery() {
      try {
        const { data, error } = await queryFn(supabase);
        
        if (!mounted) return;

        if (error) {
          throw error;
        }

        setData(data);
        setError(null);
      } catch (err) {
        if (!mounted) return;

        if (attempts < retryCount) {
          attempts++;
          setTimeout(executeQuery, retryDelay * attempts);
          return;
        }

        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        setData(null);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    executeQuery();

    // Set up realtime subscription if enabled
    let subscription;
    if (realtimeEnabled) {
      subscription = supabase
        .channel('calendar-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'public_availability'
          },
          () => {
            executeQuery();
          }
        )
        .subscribe();
    }

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [supabase, queryFn, retryCount, retryDelay, realtimeEnabled]);

  return { data, error, isLoading };
}