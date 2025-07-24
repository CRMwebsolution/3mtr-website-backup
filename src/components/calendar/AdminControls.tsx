import React from 'react';
import { useAdminAvailability } from '../../hooks/useAdminAvailability';
import type { TrailerAvailability } from '../../types/calendar';

interface AdminControlsProps {
  trailer: TrailerAvailability;
  date: Date;
  onClose: () => void;
}

export default function AdminControls({ trailer, date, onClose }: AdminControlsProps) {
  const { updateAvailability, isUpdating } = useAdminAvailability();

  const handleStatusChange = async (status: 'available' | 'unavailable') => {
    try {
      await updateAvailability(trailer.id, date, status);
      onClose();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex gap-2">
        <button
          onClick={() => handleStatusChange('available')}
          disabled={isUpdating}
          className="flex-1 px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 disabled:opacity-50"
        >
          Mark Available
        </button>
        <button
          onClick={() => handleStatusChange('unavailable')}
          disabled={isUpdating}
          className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 disabled:opacity-50"
        >
          Mark Unavailable
        </button>
      </div>
      {isUpdating && (
        <p className="text-xs text-gray-500 text-center">Updating...</p>
      )}
    </div>
  );
}