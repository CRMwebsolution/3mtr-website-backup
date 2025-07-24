export type AvailabilityStatus = 'available' | 'unavailable' | 'pending' | 'maintenance';

export interface Trailer {
  id: string;
  name: string;
  type: string;
  size: string;
  description: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilityRecord {
  id: string;
  trailerId: string;
  date: string;
  status: AvailabilityStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceRecord {
  id: string;
  trailerId: string;
  startDate: string;
  endDate: string;
  description: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}