import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Shield } from 'lucide-react';
import Header from '../components/Header';
import CalendarView from '../components/calendar/CalendarView';
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

export default function AvailabilityPage() {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Trailer Availability Calendar | 3M Trailer Rental"
        description="Check real-time availability for our trailer rentals. View available dates for car haulers, enclosed trailers, and utility trailers in Eastern NC."
        keywords="trailer availability, rental calendar, available trailers, booking calendar, Eastern North Carolina"
        url="https://3mtrailerrental.com/availability"
      />
      
      <Header />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-[#FF6600]" />
              <h1 className="text-3xl font-bold text-[#003366] dark:text-[#4d8cc8]">
                Trailer Availability
              </h1>
            </div>
            {!isAdmin && (
              <Link
                to="/admin/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Admin Login
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF6600] rounded-lg hover:bg-[#ff8533] transition-colors"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
          </div>
          <CalendarView />
        </div>
      </div>
      <Footer />
    </div>
  );
}