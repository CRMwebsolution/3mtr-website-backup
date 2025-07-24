import React from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { Tooltip } from '../ui/Tooltip';
import { useAvailability } from '../../hooks/useAvailability';
import { EditAvailabilityModal } from './EditAvailabilityModal';
import type { DayData } from './types';

interface DayCellProps {
  day: DayData;
  onUpdate: () => void;
}

export function DayCell({ day, onUpdate }: DayCellProps) {
  const { isAdmin } = useAuth();
  const { getStatusColor } = useAvailability();
  const [showEditModal, setShowEditModal] = React.useState(false);

  const handleClick = () => {
    if (isAdmin) {
      setShowEditModal(true);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'unavailable':
        return 'Booked';
      case 'maintenance':
        return 'Maintenance';
      default:
        return status;
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`
          min-h-[120px] p-2 border-r border-b relative
          ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
          ${isAdmin ? 'cursor-pointer hover:bg-gray-50' : ''}
        `}
      >
        <div className={`text-sm font-medium ${
          day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
        }`}>
          {format(day.date, 'd')}
        </div>

        <div className="mt-1 space-y-1">
          {day.trailers.map((trailer) => (
            <Tooltip
              key={trailer.id}
              content={
                <div className="p-2">
                  <div className="font-medium">{trailer.name}</div>
                  <div className="text-sm">Status: {getStatusLabel(trailer.status)}</div>
                </div>
              }
            >
              <div
                className={`
                  px-2 py-1 text-xs rounded
                  ${getStatusColor(trailer.status)}
                `}
              >
                {trailer.name} - {getStatusLabel(trailer.status)}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      {showEditModal && (
        <EditAvailabilityModal
          date={day.date}
          trailers={day.trailers}
          onClose={() => setShowEditModal(false)}
          onSave={onUpdate}
        />
      )}
    </>
  );
}