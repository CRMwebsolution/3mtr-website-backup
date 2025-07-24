import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Calendar from '../../components/calendar/Calendar';
import TrailerManagement from '../../components/admin/TrailerManagement';
import Footer from '../../components/Footer';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'trailers'>('calendar');
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Admin Dashboard
              </h1>
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'calendar'
                      ? 'bg-[#FF6600] text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setActiveTab('trailers')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'trailers'
                      ? 'bg-[#FF6600] text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Trailers
                </button>
              </nav>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calendar' ? (
          <Calendar />
        ) : (
          <TrailerManagement />
        )}
      </main>
      <Footer />
    </div>
  );
}