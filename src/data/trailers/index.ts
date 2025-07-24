import type { TrailerSpec } from './types';
import { enclosedTrailer } from './enclosed-trailer';
import { tenKTrailer } from './10k-trailer';
import { utilityTrailer } from './7x14-trailer';

const trailers: TrailerSpec[] = [
  enclosedTrailer,
  tenKTrailer,
  utilityTrailer
];

export { trailers };
export type { TrailerSpec };
export { enclosedTrailer, tenKTrailer, utilityTrailer };