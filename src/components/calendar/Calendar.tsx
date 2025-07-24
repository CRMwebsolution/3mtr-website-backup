import React from 'react';
import { useCalendarState } from '../../hooks/useCalendarState';
import { useCalendarData } from '../../hooks/useCalendarData';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function Calendar() {
  const { selectedDate, view } = useCalendarState();
  const { days, isLoading, error } = useCalendarData(selectedDate, view);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="min-h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="text-red-600 text-center py-8">
          Failed to load calendar data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <CalendarHeader />
      {view === 'month' ? (
        <MonthView days={days} />
      ) : (
        <WeekView days={days} />
      )}
    </div>
  );
}