import React from 'react';
import { BarChart, Activity } from 'lucide-react';
import { useAnalytics } from '../../features/admin/hooks/useAnalytics';
import { formatDateTime } from '../../utils/date';

export default function Analytics() {
  const { data, isLoading, error } = useAnalytics();

  if (isLoading) return <div>Loading analytics...</div>;
  if (error) return <div>Error loading analytics</div>;
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* ... rest of the component remains the same ... */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h3>
        {data.recentActivity.length > 0 ? (
          <div className="space-y-4">
            {data.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action} on {activity.tableName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(activity.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8">
            No recent activity to display
          </div>
        )}
      </div>
    </div>
  );
}