// SEO utility functions

export const generateStructuredData = (type: 'homepage' | 'blog' | 'service', data?: any) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "3 M Trailer Rental",
    "description": "Professional trailer rental services in Eastern North Carolina",
    "url": "https://3mtrailerrental.com",
    "telephone": "252-622-7921",
    "email": "cody@3mtrailerrental.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1272 Chatham Street",
      "addressLocality": "Newport",
      "addressRegion": "NC",
      "postalCode": "28570",
      "addressCountry": "US"
    }
  };

  switch (type) {
    case 'blog':
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": data?.title,
        "description": data?.excerpt,
        "image": data?.image,
        "author": {
          "@type": "Organization",
          "name": "3 M Trailer Rental"
        },
        "publisher": {
          "@type": "Organization",
          "name": "3 M Trailer Rental",
          "logo": {
            "@type": "ImageObject",
            "url": "https://3mtrailerrental.com/icon-512x512.png"
          }
        },
        "datePublished": data?.date,
        "dateModified": data?.date
      };
    
    case 'service':
      return {
        ...baseData,
        "@type": "Service",
        "serviceType": "Trailer Rental",
        "provider": baseData,
        "areaServed": {
          "@type": "State",
          "name": "North Carolina"
        }
      };
    
    default:
      return baseData;
  }
};

export const generateMetaTags = (page: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}) => {
  return {
    title: page.title || "3 M Trailer Rental - Professional Trailer Rentals in Eastern NC",
    description: page.description || "Rent car haulers, enclosed trailers, and utility trailers in Eastern North Carolina. 24/7 pickup options and easy online booking.",
    keywords: page.keywords || "trailer rental, car hauler, enclosed trailer, utility trailer, Eastern North Carolina, Newport NC",
    image: page.image || "https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/not%20trailers/Header.png",
    url: page.url || "https://3mtrailerrental.com"
  };
};

export const trackPageView = (url: string, title: string) => {
  // Google Analytics tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-D90KTJVG0B', {
      page_title: title,
      page_location: url
    });
  }
};