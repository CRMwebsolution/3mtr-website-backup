import React, { useState } from 'react';
import type { TrailerAvailability } from '../../types/calendar';
import TrailerDetails from './TrailerDetails';

interface TrailerStatusProps {
  trailer: TrailerAvailability;
  date: Date;
  isUnavailable: boolean;
}

export default function TrailerStatus({ trailer, date, isUnavailable }: TrailerStatusProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDetails(true)}
        className={`w-full px-2 py-1 text-xs rounded ${
          isUnavailable
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        }`}
      >
        {trailer.name}
      </button>

      {showDetails && (
        <TrailerDetails
          trailer={trailer}
          date={date}
          isUnavailable={isUnavailable}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}