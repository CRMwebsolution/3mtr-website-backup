import React from 'react';
import Calendar from './Calendar';
import Legend from './Legend';

export default function CalendarView() {
  return (
    <div className="space-y-6">
      <Calendar />
      <Legend />
    </div>
  );
}