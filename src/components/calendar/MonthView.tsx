import React from 'react';
import CalendarDay from './CalendarDay';
import type { CalendarDay as CalendarDayType } from '../../types/calendar';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface MonthViewProps {
  days: CalendarDayType[];
}

export default function MonthView({ days }: MonthViewProps) {
  return (
    <div className="grid grid-cols-7">
      {/* Weekday headers */}
      {WEEKDAYS.map(day => (
        <div key={day} className="p-2 text-center font-medium text-gray-600 border-b">
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {days.map((day, idx) => (
        <CalendarDay
          key={idx}
          date={day.date}
          isCurrentMonth={day.isCurrentMonth}
          trailers={day.trailers}
        />
      ))}
    </div>
  );
}