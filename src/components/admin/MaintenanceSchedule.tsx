import React from 'react';
import { Wrench } from 'lucide-react';
import { useTrailers } from '../../hooks/useTrailers';

export default function MaintenanceSchedule() {
  const { trailers } = useTrailers();
  const [selectedTrailer, setSelectedTrailer] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState('scheduled');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle maintenance schedule update
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Wrench className="w-6 h-6 text-[#FF6600]" />
        <h2 className="text-xl font-semibold text-gray-900">
          Maintenance Schedule
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
            placeholder="Describe the maintenance work"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
          >
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-[#FF6600] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#ff8533] focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:ring-offset-2"
          >
            Schedule Maintenance
          </button>
        </div>
      </form>
    </div>
  );
}