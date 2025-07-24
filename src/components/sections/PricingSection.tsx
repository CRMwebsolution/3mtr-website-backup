import React, { useState } from 'react';
import { Check, Calculator } from 'lucide-react';
import { trailers } from '../../data/trailers';
import { useNavigate } from 'react-router-dom';

const PRICING = {
  '10K Car Trailer': {
    daily: 65,
    weekly: 400,
    monthly: 1000
  },
  'Enclosed 8.5x20 Trailer': {
    daily: 100,
    weekly: 600
  },
  '7X14 Utility Trailer': {
    daily: 40,
    weekly: 200
  }
};

const SECURITY_DEPOSIT = 150;
const CARD_FEE_RATE = 0.035;

export default function PricingSection() {
  const [selectedTrailer, setSelectedTrailer] = useState('');
  const [days, setDays] = useState<number>(1);
  const [showQuote, setShowQuote] = useState(false);
  const navigate = useNavigate();

  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/booking');
  };

  const calculatePrice = (trailerType: string, days: number) => {
    const pricing = PRICING[trailerType as keyof typeof PRICING];
    let rentalCost = 0;

    if (days >= 30 && pricing.monthly) {
      const monthCount = Math.floor(days / 30);
      const remainingDays = days % 30;
      rentalCost = (monthCount * pricing.monthly) + (remainingDays * pricing.daily);
    } else if (days >= 7 && pricing.weekly) {
      const weekCount = Math.floor(days / 7);
      const remainingDays = days % 7;
      rentalCost = (weekCount * pricing.weekly) + (remainingDays * pricing.daily);
    } else {
      rentalCost = days * pricing.daily;
    }

    // Only add security deposit for Enclosed 8.5x20 Trailer
    return trailerType === 'Enclosed 8.5x20 Trailer' ? rentalCost + SECURITY_DEPOSIT : rentalCost;
  };

  const handleGetQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setShowQuote(true);
  };

  // Filter out trailers that are for sale
  const rentalTrailers = trailers.filter(trailer => !trailer.forSale);

  // Calculate values for the quote box
  let totalDue = 0;
  let baseRentalCost = 0;
  let cardFee = 0;

  if (selectedTrailer) {
    totalDue = calculatePrice(selectedTrailer, days);
    baseRentalCost = selectedTrailer === 'Enclosed 8.5x20 Trailer'
      ? totalDue - SECURITY_DEPOSIT
      : totalDue;
    cardFee = +(totalDue * CARD_FEE_RATE).toFixed(2);
  }

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#003366] dark:text-[#4d8cc8] mb-4">Simple, Transparent Pricing</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Competitive rates with no hidden fees. Choose the rental period that works best for you.
        </p>

        {/* Quote Calculator */}
        <div className="max-w-xl mx-auto mb-16 bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="text-[#FF6600] w-6 h-6" />
            <h3 className="text-2xl font-bold text-[#003366] dark:text-[#4d8cc8]">Rental Quote Calculator</h3>
          </div>
          
          <form onSubmit={handleGetQuote} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Trailer
              </label>
              <select
                value={selectedTrailer}
                onChange={(e) => setSelectedTrailer(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Choose a trailer</option>
                {Object.keys(PRICING).map((trailer) => (
                  <option key={trailer} value={trailer}>
                    {trailer}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Days
              </label>
              <input
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6600] hover:bg-[#ff8533] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Calculate Quote
            </button>
          </form>

          {showQuote && selectedTrailer && (
            <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-[#003366] dark:text-[#4d8cc8] mb-2">Your Quote</h4>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Trailer: <span className="font-semibold">{selectedTrailer}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Rental Period: <span className="font-semibold">{days} days</span>
                </p>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    Rental Cost: ${baseRentalCost}
                  </p>
                  {selectedTrailer === 'Enclosed 8.5x20 Trailer' && (
                    <p className="text-gray-600 dark:text-gray-300">
                      Security Deposit: ${SECURITY_DEPOSIT} (refundable)
                    </p>
                  )}
                  <p className="text-gray-600 dark:text-gray-300">
                    Card Fee (3.5%): ${cardFee}
                  </p>
                  <p className="text-xl font-bold text-[#003366] dark:text-[#4d8cc8]">
                    Total Due: ${(totalDue + cardFee).toFixed(2)}
                  </p>
                </div>
                <button 
                  onClick={handleBooking}
                  className="mt-4 w-full bg-[#003366] dark:bg-[#004080] hover:bg-[#004080] dark:hover:bg-[#00509f] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rentalTrailers.map((trailer, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-[#003366] dark:text-[#4d8cc8] mb-4">{trailer.title}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#003366] dark:text-[#4d8cc8]">{trailer.price.split('/')[0]}</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm ml-1">per day</span>
              </div>
              <div className="space-y-3 mb-8">
                {trailer.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="text-[#FF6600] mr-2 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
                {trailer.title === 'Enclosed 8.5x20 Trailer' && (
                  <div className="flex items-start">
                    <Check className="text-[#FF6600] mr-2 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-700 dark:text-gray-300">$150 refundable security deposit required</span>
                  </div>
                )}
              </div>
              <button 
                onClick={handleBooking}
                className="w-full bg-[#FF6600] hover:bg-[#ff8533] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Reserve Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 dark:bg-gray-700 rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-[#003366] dark:text-[#4d8cc8] mb-4">Additional Information</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• 10K Car Trailer: $400/week or $1,000/month</li>
            <li>• Enclosed Trailer: $600/week</li>
            <li>• 7X14 Utility Trailer: $200/week</li>
            <li>• Security deposit required ($150, fully refundable) for Enclosed trailer only</li>
            <li>• Flexible pickup and return times</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
