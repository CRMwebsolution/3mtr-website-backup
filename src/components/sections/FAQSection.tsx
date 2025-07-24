import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "What are your rental requirements?",
    answer: "You must be 21 years or older, have a valid driver's license, and provide proof of insurance. A credit card is required for the security deposit."
  },
  {
    question: "Do I need a special license to tow a trailer?",
    answer: "No special license is required for our trailers. However, you must have experience towing and a vehicle capable of safely towing the trailer weight."
  },
  {
    question: "What happens if I return the trailer late?",
    answer: "Late returns are charged at the daily rate. Please contact us if you need to extend your rental period."
  },
  {
    question: "Is insurance required?",
    answer: "Yes, you must provide proof of insurance coverage."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#003366] dark:text-[#4d8cc8] mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Find answers to common questions about our trailer rentals and policies.
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <button
                className="w-full px-6 py-4 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-[#003366] dark:text-[#4d8cc8] text-left">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-[#FF6600]" />
                ) : (
                  <ChevronDown className="text-[#FF6600]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}