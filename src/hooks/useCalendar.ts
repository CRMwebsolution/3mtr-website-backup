import { useState, useCallback, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  format
} from 'date-fns';
import { useAvailability } from './useAvailability';
import type { ViewType, ViewData } from '../components/calendar/types';

export function useCalendar(view: ViewType) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewData, setViewData] = useState<ViewData>({
    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    days: []
  });
  const { getTrailerAvailability } = useAvailability();

  const nextPeriod = useCallback(() => {
    setCurrentDate(current => 
      view === 'month' ? addMonths(current, 1) : addWeeks(current, 1)
    );
  }, [view]);

  const prevPeriod = useCallback(() => {
    setCurrentDate(current =>
      view === 'month' ? subMonths(current, 1) : subWeeks(current, 1)
    );
  }, [view]);

  const today = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    async function loadViewData() {
      try {
        const start = view === 'month' 
          ? startOfWeek(startOfMonth(currentDate))
          : startOfWeek(currentDate);
        
        const end = view === 'month'
          ? endOfWeek(endOfMonth(currentDate))
          : endOfWeek(currentDate);

        const days = eachDayOfInterval({ start, end });
        const daysWithTrailers = await Promise.all(
          days.map(async (date) => {
            const trailers = await getTrailerAvailability(date);
            return {
              date,
              isCurrentMonth: format(date, 'M') === format(currentDate, 'M'),
              trailers: Array.isArray(trailers) ? trailers : []
            };
          })
        );

        setViewData({
          weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          days: daysWithTrailers
        });
      } catch (error) {
        console.error('Error loading calendar data:', error);
        // Set empty data on error
        setViewData({
          weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          days: []
        });
      }
    }

    loadViewData();
  }, [currentDate, view, getTrailerAvailability]);

  return {
    currentDate,
    nextPeriod,
    prevPeriod,
    today,
    viewData
  };
}