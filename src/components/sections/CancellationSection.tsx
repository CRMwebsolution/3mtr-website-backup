import React from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

export default function CancellationSection() {
  return (
    <section id="cancellation" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#003366] dark:text-[#4d8cc8] mb-4">Cancellation Policy</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          We understand plans can change. Our flexible cancellation policy is designed with you in mind.
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
            <div className="text-[#FF6600] mb-4">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-semibold text-[#003366] dark:text-[#4d8cc8] mb-3">Standard Cancellation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Free cancellation with 72+ hours' notice.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
            <div className="text-[#FF6600] mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-semibold text-[#003366] dark:text-[#4d8cc8] mb-3">Late Cancellation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cancellations within 72 hours may result in a partial refund if the reservation caused lost bookings.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
            <div className="text-[#FF6600] mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-semibold text-[#003366] dark:text-[#4d8cc8] mb-3">Security Deposit</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Security deposit is always refunded if the trailer isn't picked up.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 dark:bg-gray-700 p-8 rounded-xl max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-[#003366] dark:text-[#4d8cc8] mb-4">Additional Policy Details</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <CheckCircle className="text-[#FF6600] mr-2 mt-1 flex-shrink-0" size={16} />
              <span>Non-refundable: Card processing fees, custom purchases.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-[#FF6600] mr-2 mt-1 flex-shrink-0" size={16} />
              <span>Delivery fees: Fully refundable if canceled before driver departure; pro-rated refund if canceled after departure.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-[#FF6600] mr-2 mt-1 flex-shrink-0" size={16} />
              <span>Any deductions will be clearly communicated in writing.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}