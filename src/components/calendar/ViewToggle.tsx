import React from 'react';
import type { ViewType } from '../../types/calendar';

interface ViewToggleProps {
  view: ViewType;
  onChange: (view: ViewType) => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200">
      <button
        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
          view === 'month'
            ? 'bg-blue-500 text-white'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onChange('month')}
      >
        Month
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
          view === 'week'
            ? 'bg-blue-500 text-white'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onChange('week')}
      >
        Week
      </button>
    </div>
  );
}