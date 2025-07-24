import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface AnalyticsData {
  totalTrailers: number;
  activeTrailers: number;
  maintenanceCount: number;
  recentActivity: Array<{
    id: string;
    action: string;
    tableName: string;
    createdAt: string;
  }>;
}

export function useAnalytics() {
  const supabase = useSupabaseClient();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [
          { count: totalTrailers },
          { count: activeTrailers },
          { count: maintenanceCount },
          { data: recentActivity }
        ] = await Promise.all([
          supabase.from('trailers').select('*', { count: 'exact', head: true }),
          supabase.from('trailers').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('maintenance_records').select('*', { count: 'exact', head: true }).eq('status', 'in_progress'),
          supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(10)
        ]);

        setData({
          totalTrailers: totalTrailers || 0,
          activeTrailers: activeTrailers || 0,
          maintenanceCount: maintenanceCount || 0,
          recentActivity: recentActivity || []
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, [supabase]);

  return { data, isLoading, error };
}