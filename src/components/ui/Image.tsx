import React, { useState, useEffect } from 'react';

interface ImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

export default function Image({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  width,
  height
}: ImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Reset states when src changes
  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    setError(false);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setError(true);
    setLoaded(false);
  };

  // Use placeholder only when there's an actual error
  const imageSrc = error || !src ? '/images/placeholder.jpg' : src;

  // Calculate aspect ratio for responsive sizing if both dimensions provided
  const aspectRatio = width && height ? (height / width) * 100 : undefined;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton - only show if dimensions are provided */}
      {!loaded && width && height && (
        <div 
          className="absolute inset-0 bg-gray-100 dark:bg-gray-700 animate-pulse"
          style={{ aspectRatio: aspectRatio ? `${width}/${height}` : undefined }}
        />
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          aspectRatio: aspectRatio ? `${width}/${height}` : undefined
        }}
      />
    </div>
  );
}