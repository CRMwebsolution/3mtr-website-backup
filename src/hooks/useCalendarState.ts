import { create } from 'zustand';
import { startOfMonth, addMonths, subMonths } from 'date-fns';
import type { ViewType } from '../types/calendar';

interface CalendarState {
  selectedDate: Date;
  view: ViewType;
  setView: (view: ViewType) => void;
  nextMonth: () => void;
  prevMonth: () => void;
}

export const useCalendarState = create<CalendarState>((set) => ({
  selectedDate: startOfMonth(new Date()),
  view: 'month',
  setView: (view) => set({ view }),
  nextMonth: () => set((state) => ({
    selectedDate: addMonths(state.selectedDate, 1)
  })),
  prevMonth: () => set((state) => ({
    selectedDate: subMonths(state.selectedDate, 1)
  }))
}));