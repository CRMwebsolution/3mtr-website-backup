import React from 'react';

export default function Legend() {
  const statuses = [
    { label: 'Available', color: 'bg-green-100 text-green-800' },
    { label: 'Unavailable', color: 'bg-red-100 text-red-800' }
  ];

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <span className="text-sm font-medium text-gray-700">Status:</span>
      {statuses.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color.split(' ')[0]}`} />
          <span className="text-sm text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  );
}