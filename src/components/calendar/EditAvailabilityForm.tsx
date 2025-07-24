import React from 'react';
import { useAvailabilityManagement } from '../../features/admin/hooks/useAvailabilityManagement';
import type { AvailabilityStatus } from '../../types/availability';

interface EditAvailabilityFormProps {
  trailerId: string;
  date: string;
  currentStatus: AvailabilityStatus;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditAvailabilityForm({
  trailerId,
  date,
  currentStatus,
  onSuccess,
  onCancel
}: EditAvailabilityFormProps) {
  const [status, setStatus] = React.useState<AvailabilityStatus>(currentStatus);
  const [notes, setNotes] = React.useState('');
  const { updateAvailability, isLoading, error } = useAvailabilityManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAvailability(trailerId, date, status, notes);
      onSuccess();
    } catch (err) {
      console.error('Failed to update availability:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-600 text-sm">{error.message}</div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as AvailabilityStatus)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="pending">Pending</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
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
  );
}