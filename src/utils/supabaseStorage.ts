import { supabase } from '../lib/supabase';

/**
 * Get the public URL for a file in Supabase Storage
 * @param bucket - The name of the storage bucket
 * @param path - The path to the file within the bucket
 * @returns The public URL for the file
 */
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
}