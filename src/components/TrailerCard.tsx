import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Info } from 'lucide-react';
import Image from './ui/Image';
import type { TrailerSpec } from '../data/trailers';

interface TrailerCardProps extends TrailerSpec {}

export default function TrailerCard({ 
  title, 
  features, 
  specs, 
  image, 
  price,
  forSale = false
}: TrailerCardProps) {
  const navigate = useNavigate();

  const handleContactClick = () => {
    // Navigate to homepage and scroll to contact section
    navigate('/');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-64">
        <Image 
          src={image}
          alt={title}
          width={400}
          height={256}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {forSale && (
          <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-center py-2 transform rotate-0 z-10 font-bold text-lg shadow-md">
            Buy outright for $7,750, firm
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#003366] dark:text-[#4d8cc8] mb-6">{title}</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#003366] dark:text-[#4d8cc8] mb-3 flex items-center">
            <Info className="mr-2" size={20} />
            Key Specifications
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {specs.map((spec, index) => (
              <div key={index} className="text-sm text-gray-700 dark:text-gray-300">
                {spec}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#003366] dark:text-[#4d8cc8] mb-3">Features & Requirements</h4>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <Check className="text-[#FF6600] mr-2 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
          {!forSale ? (
            <>
              <div>
                <span className="text-2xl font-bold text-[#003366] dark:text-[#4d8cc8]">{price.split('/')[0]}</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">per day</span>
              </div>
              <button 
                onClick={() => navigate('/booking')}
                className="bg-[#FF6600] hover:bg-[#ff8533] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                aria-label={`Rent ${title} now`}
              >
                Rent Now
              </button>
            </>
          ) : (
            <div className="w-full">
              <button 
                onClick={handleContactClick}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                aria-label={`Contact for purchase of ${title}`}
              >
                Contact to Purchase
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}