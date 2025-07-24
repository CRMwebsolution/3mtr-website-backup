export interface TrailerFormData {
  id?: string;
  name: string;
  type: 'enclosed' | 'flatbed' | 'equipment';
  size?: string;
  description?: string;
  is_active: boolean;
}