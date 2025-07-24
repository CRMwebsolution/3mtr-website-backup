import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ComingSoonFeatureProps {
  title: string;
  description: string;
}

export default function ComingSoonFeature({ title, description }: ComingSoonFeatureProps) {
  return (
    <div className="flex gap-3">
      <CheckCircle className="text-[#FF6600] flex-shrink-0 mt-1" size={20} />
      <div>
        <h3 className="font-semibold text-[#003366] mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}