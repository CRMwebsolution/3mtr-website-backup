import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEOHead({
  title = "3 M Trailer Rental - Professional Trailer Rentals in Eastern NC",
  description = "Rent car haulers, enclosed trailers, and utility trailers in Eastern North Carolina. 24/7 pickup options and easy online booking.",
  keywords = "trailer rental, car hauler, enclosed trailer, utility trailer, Eastern North Carolina, Newport NC, equipment rental",
  image = "https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/not%20trailers/Header.png",
  url = "https://3mtrailerrental.com",
  type = "website"
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="3 M Trailer Rental" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}