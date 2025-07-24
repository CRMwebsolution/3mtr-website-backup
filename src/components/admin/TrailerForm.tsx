import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { TrailerFormData } from '../../types/trailers';

interface TrailerFormProps {
  trailer?: TrailerFormData | null;
  onSubmit: (data: TrailerFormData) => Promise<void>;
  onClose: () => void;
}

export default function TrailerForm({ trailer, onSubmit, onClose }: TrailerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TrailerFormData>({
    id: trailer?.id || '',
    name: trailer?.name || '',
    type: trailer?.type || 'enclosed',
    size: trailer?.size || '',
    description: trailer?.description || '',
    is_active: trailer?.is_active ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save trailer');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {trailer ? 'Edit Trailer' : 'Add New Trailer'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="trailer-name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="trailer-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
              required
            />
          </div>

          <div>
            <label htmlFor="trailer-type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="trailer-type"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
              required
            >
              <option value="enclosed">Enclosed</option>
              <option value="flatbed">Flatbed</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>

          <div>
            <label htmlFor="trailer-size" className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <input
              id="trailer-size"
              type="text"
              value={formData.size}
              onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
              placeholder="e.g., 8.5x20"
            />
          </div>

          <div>
            <label htmlFor="trailer-description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="trailer-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
              />
              <span className="ml-2 text-sm text-gray-600">Active</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF6600] hover:bg-[#ff8533] rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (trailer ? 'Save Changes' : 'Add Trailer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}