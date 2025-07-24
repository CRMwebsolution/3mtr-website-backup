import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useCalendarState } from '../../hooks/useCalendarState';
import CalendarDay from './CalendarDay';
import { useCalendarData } from '../../hooks/useCalendarData';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function WeekView() {
  const { selectedDate } = useCalendarState();
  const { days, isLoading } = useCalendarData(selectedDate, 'week');

  if (isLoading) {
    return <div className="p-4 text-center">Loading calendar...</div>;
  }

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
          isCurrentMonth={true}
          trailers={day.trailers}
        />
      ))}
    </div>
  );
}