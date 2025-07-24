import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Image from '../ui/Image';
import type { BlogPost } from '../../data/blog/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image 
          src={post.image} 
          alt={post.title}
          width={400}
          height={192}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-[#FF6600] text-white px-3 py-1 rounded-full text-sm">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#003366] dark:text-[#4d8cc8] mb-2">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
          <Link 
            to={`/blog/${post.id}`}
            className="text-[#FF6600] font-semibold flex items-center hover:text-[#ff8533] transition-colors"
            aria-label={`Read more about ${post.title}`}
          >
            Read More
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}