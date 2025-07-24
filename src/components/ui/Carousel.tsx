import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from './Image';

interface CarouselImage {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[] | undefined;
  title: string;
}

export default function Carousel({ images, title }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Validate and filter images
  const validImages = React.useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) {
      return [{ src: '/images/placeholder.jpg', alt: title }];
    }
    return images.filter(img => img && typeof img.src === 'string');
  }, [images, title]);

  const transition = useCallback((newIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    if (validImages.length <= 1) return;
    const newIndex = (currentIndex + 1) % validImages.length;
    transition(newIndex);
  }, [currentIndex, validImages.length, transition]);

  const prevSlide = useCallback(() => {
    if (validImages.length <= 1) return;
    const newIndex = (currentIndex - 1 + validImages.length) % validImages.length;
    transition(newIndex);
  }, [currentIndex, validImages.length, transition]);

  // Auto-advance slides
  React.useEffect(() => {
    if (validImages.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, validImages.length]);

  const currentImage = validImages[currentIndex];

  return (
    <div className="relative w-full">
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden group">
        <Image
          src={currentImage?.src}
          alt={currentImage?.alt || title}
          width={800}
          height={450}
          className="w-full h-full"
          loading="lazy"
        />
        
        {validImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {validImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => transition(index)}
                  disabled={isTransitioning || index === currentIndex}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}