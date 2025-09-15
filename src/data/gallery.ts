interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryData {
  [key: string]: GalleryImage[];
}

export const galleryImages: GalleryData = {
  'Equipment Trailer': [],
  'Enclosed 8.5x20 Trailer': [
    {
      src: 'Enclosed/back.jpg',
      alt: 'Enclosed trailer back view'
    },
    {
      src: 'Enclosed/enclosed-door.jpg',
      alt: 'Enclosed trailer door'
    },
    {
      src: 'Enclosed/enclosed-front.jpg',
      alt: 'Enclosed trailer front view'
    },
    {
      src: 'Enclosed/enclosed-left.jpg',
      alt: 'Enclosed trailer left side'
    },
    {
      src: 'Enclosed/enclosed-ramp.jpg',
      alt: 'Enclosed trailer ramp'
    },
    {
      src: 'Enclosed/enclosed-winch.jpg',
      alt: 'Enclosed trailer winch'
    }
  ],
  '10K Car Trailer': [
    {
      src: '10K/10Kramps1.jpg',
      alt: '10K Car Trailer with ramps'
    },
   
    {
      src: '10K/Back1.jpg',
      alt: '10K Car Trailer rear view'
    },
    {
      src: '10K/10K with roller.jpg',
      alt: '10K Car Trailer with roller equipment'
    },
    {
      src: '10K/10K with explorer2.jpg',
      alt: '10K Car Trailer with Ford Explorer - Front View'
    },
    {
      src: '10K/10K with explorer.jpg',
      alt: '10K Car Trailer with Ford Explorer - Side View'
    }
  ],
  '7X14 Utility Trailer': [
    {
      src: '7X14/7x14 front.jpg',
      alt: '7X14 Utility Trailer front view'
    },
    {
      src: '7X14/7x14 rear.jpg',
      alt: '7X14 Utility Trailer rear view'
    },
    {
      src: '7X14/7x14 right.jpg',
      alt: '7X14 Utility Trailer right side'
    },
    {
      src: '7X14/SXS.png',
      alt: '7X14 Utility Trailer with SXS'
    },
    {
      src: '7X14/house stuff.jpg',
      alt: '7X14 Utility Trailer loaded with household items'
    },
    {
      src: '7X14/utility with lumber.jpg',
      alt: '7X14 Utility Trailer loaded with lumber'
    }
  ]
};