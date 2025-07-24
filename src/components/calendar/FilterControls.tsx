import React from 'react';
import { Search } from 'lucide-react';
import { useCalendarState } from '../../hooks/useCalendarState';

export default function FilterControls() {
  const { filters, setFilters } = useCalendarState();

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <select
            value={filters.trailerType}
            onChange={(e) => setFilters({ ...filters, trailerType: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Trailer Types</option>
            <option value="enclosed">Enclosed</option>
            <option value="flatbed">Flatbed</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}