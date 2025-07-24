import { format, isToday, parseISO } from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDateTime(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, 'MMM d, yyyy h:mm a');
  } catch (error) {
    console.error('Invalid date:', dateStr);
    return 'Invalid date';
  }
}

export function isDateToday(date: Date): boolean {
  return isToday(date);
}

export function getMonthYearDisplay(date: Date): string {
  return format(date, 'MMMM yyyy');
}