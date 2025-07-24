import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { MaintenanceRecord } from '../../../types/availability';

export function useMaintenanceManagement() {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createMaintenance = async (data: Omit<MaintenanceRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: record, error } = await supabase
        .from('maintenance_records')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return record;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create maintenance record'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMaintenance = async (id: string, updates: Partial<MaintenanceRecord>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('maintenance_records')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update maintenance record'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createMaintenance,
    updateMaintenance,
    isLoading,
    error
  };
}