import { z } from 'zod';

export const trailerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  type: z.enum(['enclosed', 'flatbed', 'equipment']),
  size: z.string().min(3, 'Size must be specified'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  images: z.array(z.string().url()).optional(),
  is_active: z.boolean().default(true)
});

export type TrailerFormData = z.infer<typeof trailerSchema>;