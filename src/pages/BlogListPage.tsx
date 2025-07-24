import React from 'react';
import BlogList from '../components/blog/BlogList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Trailer Rental Tips & Resources | 3M Trailer Rental Blog"
        description="Expert advice and practical tips for trailer rentals. Learn about choosing the right trailer, moving tips, and cost comparisons."
        keywords="trailer rental tips, moving advice, trailer selection guide, rental vs buying trailers"
        url="https://3mtrailerrental.com/blog"
      />
      
      <Header />
      <div className="container mx-auto px-4 py-20 pt-32">
        <h1 className="text-4xl font-bold text-center text-[#003366] dark:text-[#4d8cc8] mb-4">
          Trailer Rental Tips & Resources
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Expert advice and practical tips to help you make informed decisions about trailer rentals.
        </p>
        <BlogList />
      </div>
      <Footer />
    </div>
  );
}