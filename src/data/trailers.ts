import type { TrailerSpec } from './trailers/types';
import { enclosedTrailer } from './trailers/enclosed-trailer';
import { tenKTrailer } from './trailers/10k-trailer';
import { utilityTrailer } from './trailers/7x14-trailer';

export const trailers: TrailerSpec[] = [
  enclosedTrailer,
  tenKTrailer,
  utilityTrailer
];

export type { TrailerSpec };
export { enclosedTrailer, tenKTrailer, utilityTrailer };