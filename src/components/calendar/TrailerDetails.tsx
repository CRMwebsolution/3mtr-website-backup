import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAvailabilityManagement } from '../../hooks/useAvailabilityManagement';
import type { TrailerAvailability } from '../../types/calendar';
import { format } from 'date-fns';

interface TrailerDetailsProps {
  trailer: TrailerAvailability;
  date: Date;
  isUnavailable: boolean;
  onClose: () => void;
}

export default function TrailerDetails({ 
  trailer, 
  date, 
  isUnavailable,
  onClose 
}: TrailerDetailsProps) {
  const { isAdmin } = useAuth();
  const { updateAvailability, isUpdating } = useAvailabilityManagement();
  const [error, setError] = React.useState<string | null>(null);

  const handleStatusChange = async (newStatus: 'available' | 'unavailable') => {
    try {
      setError(null);
      await updateAvailability(trailer.id, date, newStatus);
      onClose();
    } catch (error) {
      console.error('Failed to update availability:', error);
      setError(error instanceof Error ? error.message : 'Failed to update availability');
    }
  };

  return (
    <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg p-4 w-64">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{trailer.name}</h3>
          <p className="text-sm text-gray-500">{format(date, 'MMM d, yyyy')}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm">
          <span className="font-medium">Type:</span> {trailer.type}
        </p>
        <p className="text-sm">
          <span className="font-medium">Status:</span>{' '}
          <span className={isUnavailable ? 'text-red-600' : 'text-green-600'}>
            {isUnavailable ? 'Unavailable' : 'Available'}
          </span>
        </p>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded">
          {error}
        </div>
      )}

      {isAdmin && (
        <div className="space-y-2">
          <button
            onClick={() => handleStatusChange(isUnavailable ? 'available' : 'unavailable')}
            disabled={isUpdating}
            className={`w-full px-3 py-2 text-sm font-medium rounded-md ${
              isUnavailable
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            } disabled:opacity-50`}
            aria-label={isUnavailable ? 'Mark as available' : 'Mark as unavailable'}
          >
            {isUpdating ? 'Updating...' : (
              isUnavailable ? 'Mark as Available' : 'Mark as Unavailable'
            )}
          </button>
        </div>
      )}
    </div>
  );
}