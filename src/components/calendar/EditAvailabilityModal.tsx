import React, { useState } from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { useAvailabilityMutation } from '../../hooks/useAvailabilityMutation';
import type { TrailerAvailability } from '../../types/calendar';
import type { AvailabilityStatus } from '../../types/availability';

interface EditAvailabilityModalProps {
  date: Date;
  trailers: TrailerAvailability[];
  onClose: () => void;
  onSave: () => void;
}

export function EditAvailabilityModal({
  date,
  trailers,
  onClose,
  onSave
}: EditAvailabilityModalProps) {
  const { updateAvailability, isLoading, error } = useAvailabilityMutation();
  const [updates, setUpdates] = useState<Record<string, AvailabilityStatus>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Update availability for each changed trailer
      await Promise.all(
        Object.entries(updates).map(([trailerId, status]) =>
          updateAvailability(
            trailerId,
            formattedDate,
            status,
            notes[trailerId]
          )
        )
      );

      setFeedback('Changes saved successfully');
      onSave();
      
      // Close modal after a brief delay to show success message
      setTimeout(onClose, 1000);
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Failed to update availability');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Edit Availability for {format(date, 'MMMM d, yyyy')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {(error || feedback) && (
          <div className={`mb-4 p-3 rounded-md ${
            error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {error?.message || feedback}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {trailers.map((trailer) => (
            <div key={trailer.id} className="space-y-2">
              <label htmlFor={`trailer-${trailer.id}`} className="block text-sm font-medium text-gray-700">
                {trailer.name}
              </label>
              <select
                id={`trailer-${trailer.id}`}
                value={updates[trailer.id] || trailer.status}
                onChange={(e) => setUpdates(prev => ({
                  ...prev,
                  [trailer.id]: e.target.value as AvailabilityStatus
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
                <option value="pending">Pending</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <textarea
                value={notes[trailer.id] || ''}
                onChange={(e) => setNotes(prev => ({
                  ...prev,
                  [trailer.id]: e.target.value
                }))}
                placeholder="Optional notes"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600] text-sm"
                rows={2}
                aria-label={`Notes for ${trailer.name}`}
              />
            </div>
          ))}

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
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF6600] hover:bg-[#ff8533] rounded-md disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}