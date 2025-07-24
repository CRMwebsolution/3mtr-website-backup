import React from 'react';
import Image from '../ui/Image';

interface BlogHeaderProps {
  title: string;
  date: string;
  category: string;
  image: string;
}

export default function BlogHeader({ title, date, category, image }: BlogHeaderProps) {
  return (
    <div className="relative h-64">
      <Image 
        src={image} 
        alt={title}
        width={800}
        height={256}
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute top-4 left-4 bg-[#FF6600] text-white px-3 py-1 rounded-full text-sm">
        {category}
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-4 rounded-lg">
        <div className="text-sm text-gray-200 mb-1">
          {new Date(date).toLocaleDateString()}
        </div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>
      </div>
    </div>
  );
}