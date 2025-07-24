import { BlogPost } from './types';
import { costOfOwningPost } from './posts/cost-of-owning';
import { choosingTrailerPost } from './posts/choosing-trailer';
import { movingTipsPost } from './posts/moving-tips';

export const blogPosts: BlogPost[] = [
  costOfOwningPost,
  choosingTrailerPost,
  movingTipsPost
];

export type { BlogPost };
export { costOfOwningPost, choosingTrailerPost, movingTipsPost };