import React from 'react';
import { Calendar } from 'lucide-react';
import { useTrailers } from '../../hooks/useTrailers';
import { useAvailability } from '../../hooks/useAvailability';
import { AvailabilityStatus } from '../../types/availability';

export default function CalendarManagement() {
  const { trailers } = useTrailers();
  const { getStatusColor } = useAvailability();
  const [selectedTrailer, setSelectedTrailer] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [status, setStatus] = React.useState<AvailabilityStatus>('available');
  const [notes, setNotes] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle availability update
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-[#FF6600]" />
        <h2 className="text-xl font-semibold text-gray-900">
          Manage Calendar
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Trailer
          </label>
          <select
            value={selectedTrailer}
            onChange={(e) => setSelectedTrailer(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
          >
            <option value="">Select a trailer</option>
            {trailers.map((trailer) => (
              <option key={trailer.id} value={trailer.id}>
                {trailer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as AvailabilityStatus)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="pending">Pending</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
            placeholder="Optional notes about this availability status"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-[#FF6600] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#ff8533] focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:ring-offset-2"
          >
            Update Availability
          </button>
        </div>
      </form>
    </div>
  );
}