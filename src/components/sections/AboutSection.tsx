import React from 'react';
import { Clock, Shield, Users, Truck } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Our trailers are available around the clock to meet your schedule.'
  },
  {
    icon: Shield,
    title: 'Family-Owned',
    description: 'Proudly serving Newport, NC with trusted, personalized service.'
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Dedicated support and flexible solutions for every customer.'
  },
  {
    icon: Truck,
    title: 'Quality Fleet',
    description: 'Well-maintained trailers equipped with modern safety features.'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-[#003366] dark:text-[#4d8cc8] mb-4">About 3 M Trailer Rental</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Are you searching for "trailer rentals near me"? Look no further. At 3 M Trailer Rental, we offer a fleet of well-maintained trailers to meet all your hauling and transport needs right here in Newport, NC. Whether you're moving equipment, materials, or personal belongings, our flexible rental options and competitive local pricing have you covered.

Conveniently located in Eastern North Carolina, we proudly serve the surrounding areas with quick and easy pickup and drop-off services. Our knowledgeable team is dedicated to providing a seamless rental experience from start to finish.

For dependable trailer rentals near you, trust 3 M Trailer Rental. Book online today to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <div className="inline-block p-3 bg-[#003366] dark:bg-[#004080] rounded-full mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#003366] dark:text-[#4d8cc8] mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}