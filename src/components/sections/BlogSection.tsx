import React from 'react';
import BlogList from '../blog/BlogList';

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#003366] mb-4">Tips and Insights</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Expert advice and practical tips to make the most of your trailer rental experience.
        </p>
        <BlogList />
      </div>
    </section>
  );
}