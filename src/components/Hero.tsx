import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center" id="home">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/not%20trailers/Header.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy9ub3QgdHJhaWxlcnMvSGVhZGVyLnBuZyIsImlhdCI6MTc0NTgxMDA0NSwiZXhwIjoxNzc3MzQ2MDQ1fQ.jfc2KuJ3Ac270iYghW8WyLbcZ9GOf2J6FhYFt7ViqQk")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Reliable Trailers, Anytime You Need Them
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Affordable trailer rentals for every need, available 24/7 in Newport, NC.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection('trailers')}
              className="bg-[#FF6600] hover:bg-[#ff8533] px-8 py-4 rounded-lg font-semibold flex items-center justify-center"
            >
              View Our Trailers
              <ArrowRight className="ml-2" size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="border-2 border-white hover:bg-white hover:text-[#003366] px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Check Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}