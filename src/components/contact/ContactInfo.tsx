import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contactInfo } from '../../data/contact';

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-4xl font-bold text-[#003366] dark:text-[#4d8cc8] mb-4">Get in Touch</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Have questions about our trailers or need assistance? We're here to help 24/7.
      </p>

      <div className="space-y-6 mb-8">
        <div className="flex items-start">
          <Phone className="text-[#FF6600] mr-4 mt-1" />
          <div>
            <h3 className="font-semibold text-[#003366] dark:text-[#4d8cc8]">Phone</h3>
            <p className="text-gray-600 dark:text-gray-300">{contactInfo.phone}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Mail className="text-[#FF6600] mr-4 mt-1" />
          <div>
            <h3 className="font-semibold text-[#003366] dark:text-[#4d8cc8]">Email</h3>
            <p className="text-gray-600 dark:text-gray-300">{contactInfo.email}</p>
          </div>
        </div>
        <div className="flex items-start">
          <MapPin className="text-[#FF6600] mr-4 mt-1" />
          <div>
            <h3 className="font-semibold text-[#003366] dark:text-[#4d8cc8]">Location</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {contactInfo.address.street}, {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className="text-[#FF6600] mr-4 mt-1" />
          <div>
            <h3 className="font-semibold text-[#003366] dark:text-[#4d8cc8]">Hours</h3>
            <p className="text-gray-600 dark:text-gray-300">{contactInfo.hours}</p>
          </div>
        </div>
      </div>
    </div>
  );
}