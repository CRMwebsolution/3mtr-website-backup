import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export function useImageUpload() {
  const supabase = useSupabaseClient();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (file: File, path: string) => {
    setIsUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('trailer-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('trailer-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload image'));
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error
  };
}