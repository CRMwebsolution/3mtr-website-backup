import React, { useState, useEffect } from 'react';
import { galleryImages } from '../data/gallery';
import Image from './ui/Image';

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Flatten all images into a single array
  const allImages = Object.values(galleryImages).reduce((acc, trailerImages) => {
    return [...acc, ...trailerImages];
  }, [] as {src: string, alt: string}[]);

  // Shuffle array for desktop
  const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);

  // Mobile display: one image from each trailer type
  const mobileDisplayImages = [
    // Enclosed trailer image
    galleryImages['Enclosed 8.5x20 Trailer']?.[0],
    // Car trailer image
    galleryImages['10K Car Trailer']?.[0],
    // Utility trailer image
    galleryImages['7X14 Utility Trailer']?.[0]
  ].filter(Boolean); // Remove any undefined entries

  // Choose which images to display
  const imagesToDisplay = isMobile ? mobileDisplayImages : shuffledImages;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="gallery">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#003366] dark:text-[#4d8cc8] mb-8">
          Our Trailer Gallery
        </h2>
        <div className={`grid gap-4 ${
          isMobile 
            ? 'grid-cols-1' 
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {imagesToDisplay.map((image, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-lg ${
                // Only apply random row spans on desktop
                !isMobile && Math.random() > 0.8 ? 'row-span-2' : ''
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {isMobile && (
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Showing featured images from each trailer type
            </p>
          </div>
        )}
      </div>
    </section>
  );
}