import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if a user is an admin
export async function isUserAdmin(userId: string) {
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) return false;
  return data?.role === 'admin';
}

// Calendar management functions
export async function updateAvailability(
  trailerId: string,
  date: string,
  status: string,
  notes?: string
) {
  return supabase
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
}

export async function getAvailability(startDate: string, endDate: string) {
  return supabase
    .from('availability')
    .select(`
      *,
      trailers (
        id,
        name,
        type,
        size
      )
    `)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date');
}