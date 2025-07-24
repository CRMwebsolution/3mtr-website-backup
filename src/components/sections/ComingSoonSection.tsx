import React from 'react';
import { Timer } from 'lucide-react';
import ComingSoonFeature from './ComingSoonFeature';
import Carousel from '../ui/Carousel';
import { comingSoonFeatures } from '../../data/coming-soon';

const carouselImages = [
  {
    src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K-1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEstMS5qcGciLCJpYXQiOjE3NDM3MjczMDQsImV4cCI6MjM3NDQ0NzMwNH0.xec88Z4fCwIOYsm8TUsef_sGHK7IsLV-6jgXF36o0W8',
    alt: 'Professional 7x20 Flatbed Trailer - Front View'
  },
  {
    src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K-2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEstMi5qcGciLCJpYXQiOjE3NDM3Mjc2NDgsImV4cCI6MjM3NDQ0NzY0OH0.3kpYbTD1yZ70M0Z9IpQYNKCqwec8TSIMX1Mz87WvvEA',
    alt: 'Professional 7x20 Flatbed Trailer - Side View'
  },
  {
    src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K-3.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEstMy5qcGciLCJpYXQiOjE3NDM3Mjc3MTgsImV4cCI6MjM3NDQ0NzcxOH0.zydzudb5lFa8Baw7A0-hDUl4uuaG0nf3lH5S6ZjmLFA',
    alt: 'Professional 7x20 Flatbed Trailer - Rear View'
  },
  {
    src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K-4.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEstNC5qcGciLCJpYXQiOjE3NDM3Mjc3ODIsImV4cCI6MjM3NDQ0Nzc4Mn0.5w1Zz6DJQiGUzuO0OjHixzPymupdXGH5YK0V8tfj7Ww',
    alt: 'Professional 7x20 Flatbed Trailer - Loading Demonstration'
  },
  {
    src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K-5.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEstNS5qcGciLCJpYXQiOjE3NDM3Mjc4ODQsImV4cCI6MjM3NDQ0Nzg4NH0.thfbWYmDOKWeFmkUI08X2HNmxbRnDSbYio6PmjJKfiE',
    alt: 'Professional 7x20 Flatbed Trailer - Detail View'
  }
];

export default function ComingSoonSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 text-[#FF6600] font-semibold mb-4">
              <Timer size={24} />
              <span>Coming Soon</span>
            </div>
            <h2 className="text-4xl font-bold text-[#003366] mb-6">
              New 7' x 20' 10K Flatbed Trailer
            </h2>
            <p className="text-gray-600 mb-8">
              Experience superior hauling capability with our upcoming professional-grade flatbed trailer. 
              Perfect for heavy-duty applications and built to last.
            </p>
            
            <div className="grid gap-6">
              {comingSoonFeatures.map((feature, index) => (
                <ComingSoonFeature 
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Carousel 
                images={carouselImages}
                title="New Professional Flatbed Trailer"
              />
              <div className="absolute top-4 right-4 bg-[#FF6600] text-white px-4 py-2 rounded-full text-sm font-semibold">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}