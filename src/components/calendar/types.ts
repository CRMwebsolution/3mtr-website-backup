export type ViewType = 'month' | 'week';

export interface ViewData {
  weekDays: string[];
  days: DayData[];
}

export interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  trailers: TrailerAvailability[];
}

export interface TrailerAvailability {
  id: string;
  name: string;
  status: 'available' | 'unavailable' | 'pending' | 'maintenance';
  description: string;
}