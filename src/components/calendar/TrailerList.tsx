import React from 'react';
import { useTrailers } from '../../hooks/useTrailers';

export function TrailerList() {
  const { trailers, isLoading } = useTrailers();

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium text-gray-900 mb-4">Available Trailers</h3>
      <div className="space-y-3">
        {trailers.map((trailer) => (
          <div
            key={trailer.id}
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium text-gray-900">{trailer.name}</div>
            <div className="text-sm text-gray-500">{trailer.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
}