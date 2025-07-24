import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { initializeBookingWidget } from '../utils/widgetLoader';

export default function BookingWidget() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start loading widget immediately
    const loadWidget = async () => {
      try {
        await initializeBookingWidget();
      } catch (error) {
        console.error('Failed to load booking widget:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWidget();

    // Set a maximum loading time
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-40">
          <LoadingSpinner />
        </div>
      )}
      <div id="VG_OVERLAY_CONTAINER" className="absolute inset-0" />
    </>
  );
}