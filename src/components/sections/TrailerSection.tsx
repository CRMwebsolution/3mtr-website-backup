import React from 'react';
import TrailerCard from '../TrailerCard';
import { trailers } from '../../data/trailers';

export default function TrailerSection() {
  return (
    <>
      {/* Google Reviews Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#003366] dark:text-[#4d8cc8] mb-8">
            What Our Customers Say
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="elfsight-app-6f62ce77-96ea-44ab-b298-bbbf1383315c" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

      <section id="trailers" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#003366] dark:text-[#4d8cc8] mb-4">Our Trailer Fleet</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Professional-grade trailers for all your hauling needs. Each rental includes essential safety equipment and 24/7 support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trailers.map((trailer) => (
            <TrailerCard 
              key={trailer.title} 
              {...trailer} 
            />
          ))}
        </div>
      </div>
      </section>
    </>
  );
}