export type ViewType = 'month' | 'week';

export interface TrailerAvailability {
  id: string;
  name: string;
  type: string;
  size?: string;
  description?: string;
  status: 'available' | 'unavailable';
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  trailers: TrailerAvailability[];
}

export interface CalendarViewData {
  days: CalendarDay[];
}