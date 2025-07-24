import React from 'react';
import { format } from 'date-fns';
import type { TrailerAvailability } from '../../types/calendar';
import TrailerStatus from './TrailerStatus';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  trailers: TrailerAvailability[];
}

export default function CalendarDay({ date, isCurrentMonth, trailers }: CalendarDayProps) {
  return (
    <div className={`min-h-[120px] p-2 border-r border-b ${
      isCurrentMonth ? 'bg-white' : 'bg-gray-50'
    }`}>
      <div className={`text-sm font-medium ${
        isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
      }`}>
        {format(date, 'd')}
      </div>

      <div className="mt-1 space-y-1">
        {trailers.map((trailer) => (
          <TrailerStatus
            key={trailer.id}
            trailer={trailer}
            date={date}
            isUnavailable={trailer.status === 'unavailable'}
          />
        ))}
      </div>
    </div>
  );
}