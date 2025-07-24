import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import TrailerForm from './TrailerForm';
import TrailerList from './TrailerList';
import { useTrailers } from '../../hooks/useTrailers';
import type { TrailerFormData } from '../../types/trailers';

export default function TrailerManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingTrailer, setEditingTrailer] = useState<TrailerFormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { trailers, isLoading } = useTrailers();
  const supabase = useSupabaseClient();

  const handleSubmit = async (data: TrailerFormData) => {
    try {
      setError(null);
      
      const { error: submitError } = await supabase
        .from('trailers')
        .insert([{
          name: data.name,
          type: data.type,
          size: data.size,
          description: data.description,
          is_active: data.is_active
        }]);

      if (submitError) throw submitError;
      
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add trailer:', err);
      setError(err instanceof Error ? err.message : 'Failed to add trailer');
      throw err;
    }
  };

  const handleEdit = async (id: string, data: TrailerFormData) => {
    try {
      setError(null);
      
      const { error: updateError } = await supabase
        .from('trailers')
        .update({
          name: data.name,
          type: data.type,
          size: data.size,
          description: data.description,
          is_active: data.is_active
        })
        .eq('id', id);

      if (updateError) throw updateError;
      
      setEditingTrailer(null);
    } catch (err) {
      console.error('Failed to update trailer:', err);
      setError(err instanceof Error ? err.message : 'Failed to update trailer');
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      
      const { error: deleteError } = await supabase
        .from('trailers')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
    } catch (err) {
      console.error('Failed to delete trailer:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete trailer');
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Manage Trailers
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6600] hover:bg-[#ff8533]"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Trailer
        </button>
      </div>

      <TrailerList 
        trailers={trailers}
        onEdit={setEditingTrailer}
        onDelete={handleDelete}
      />

      {(showForm || editingTrailer) && (
        <TrailerForm
          trailer={editingTrailer}
          onSubmit={async (data) => {
            if (editingTrailer?.id) {
              await handleEdit(editingTrailer.id, data);
            } else {
              await handleSubmit(data);
            }
          }}
          onClose={() => {
            setShowForm(false);
            setEditingTrailer(null);
          }}
        />
      )}
    </div>
  );
}