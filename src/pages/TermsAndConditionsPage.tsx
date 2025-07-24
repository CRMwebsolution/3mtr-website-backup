import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms and Conditions | 3M Trailer Rental"
        description="Read our rental terms and conditions for trailer rentals in Eastern North Carolina."
        url="https://3mtrailerrental.com/terms-and-conditions"
      />
      
      <Header />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/booking" 
            className="inline-flex items-center text-[#FF6600] hover:text-[#ff8533] mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Booking
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-4xl font-bold text-[#003366] dark:text-[#4d8cc8] mb-8">
              Terms and Conditions
            </h1>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>1. Definitions</h2>
              <p>
                "Agreement" means all terms and conditions listed here and any documents provided at the time of rental.
                <br />
                "You" or "your" refers to the renter, any listed additional driver, and any party billed for the rental.
                <br />
                "We", "our", or "us" refers to Three M Trailer Rental, LLC.
                <br />
                "Trailer" refers to the specific non-motorized trailer identified in this Agreement.
                <br />
                Loss of Use: Downtime due to damage or loss, billed at the daily rental rate.
                <br />
                Diminished Value: The reduced value of the trailer after repair or due to non-repair.
              </p>

              <h2>2. Rental Terms & Liability</h2>
              <p>
                This is a rental contract only. We may repossess the trailer without notice if abandoned or used improperly.
                <br />
                You agree to defend, indemnify, and hold us harmless from any claims, damages, or legal costs resulting from your use.
                <br />
                The trailer is rented as-is, with no warranties of any kind.
              </p>

              <h2>3. Condition & Return</h2>
              <p>
                Return the trailer to the agreed location, date, and time in the same condition received (except normal wear).
                <br />
                If returned after hours, you remain liable until we inspect it.
                <br />
                Any repairs during rental require our approval.
              </p>

              <h2>4. Damage, Loss & Reporting</h2>
              <p>
                You are fully responsible for all trailer damage, theft, or loss—regardless of fault—including due to road, weather, or natural causes. This includes:
              </p>
              <ul>
                <li>Cost of repairs or full replacement</li>
                <li>Loss of use</li>
                <li>Diminished value</li>
                <li>Missing equipment</li>
                <li>Admin fees tied to claims</li>
              </ul>
              <p>
                You must report any accident to both us and the police within 24 hours.
              </p>

              <h2>5. Included Equipment & Responsibility</h2>
              <p>
                You confirm receiving all listed equipment in working order and agree to return everything in the same condition.
                <br />
                You are responsible for all damage, including theft.
              </p>

              <h2>6. Prohibited Uses</h2>
              <p>Do not use the trailer for:</p>
              <ul>
                <li>Transporting hazardous/illegal materials or people</li>
                <li>Being towed by anyone impaired or unauthorized</li>
                <li>Travel outside the U.S.</li>
                <li>Overloading or improperly secured cargo</li>
                <li>Low-clearance or unsafe towing conditions</li>
                <li>Affixing signs, paint, or decals</li>
                <li>Any illegal or reckless activity</li>
              </ul>

              <h2>7. Fees & Charges</h2>
              <p>You agree to pay:</p>
              <ul>
                <li>Rental rate</li>
                <li>Taxes and fees</li>
                <li>Traffic, toll, or parking violations (+ $100 admin fee per item)</li>
                <li>Recovery costs if not returned</li>
                <li>Legal or collection fees</li>
                <li>5% late payment fee</li>
                <li>$100 (or max allowed by law) for returned checks</li>
                <li>Up to $500 for excessive cleaning</li>
                <li>$5/hour (up to $75/day) for late returns for the Utility trailer and $10/hour (up to $200/day) for the car trailer and enclosed trailer</li>
              </ul>
              <p>No refunds for early return.</p>

              <h2>8. Deposit</h2>
              <p>
                Your deposit may be applied to unpaid balances, including damage estimates.
              </p>

              <h2>9. Modifications</h2>
              <p>
                This Agreement can only be changed in writing by Three M Trailer Rental, LLC.
                <br />
                All prior verbal agreements are void.
              </p>

              <h2>10. Legal Notes</h2>
              <p>
                Our failure to enforce any part of this Agreement does not waive our rights.
                <br />
                You release us from liability for any special or indirect damages.
                <br />
                If any part is unenforceable, the rest remains valid.
              </p>

              <h2>11. Cancellation Policy</h2>
              <p>
                Cancellations are permitted at no charge with a minimum of 72 hours' notice prior to the rental start time.
              </p>
              <p>
                If cancellation occurs with less than 72 hours' notice and the original reservation caused the Business to decline other bookings, the Client's refund will be reduced accordingly. A partial refund will be issued based on the number of overlapping rental days that were declined as a result of the Client's reservation. In all cases, the security deposit will be fully refunded if the trailer was not picked up.
              </p>
              <p>The following fees and charges are non-refundable:</p>
              <ul>
                <li>Card processing fees</li>
                <li>Special equipment purchases requested by the Client (such as ramps, straps, etc.)</li>
              </ul>
              <p>
                Delivery fees are refundable only if cancellation occurs before delivery transit begins.
                If the driver is already en route, the Client will be responsible for a pro-rated delivery fee based on mileage traveled at the time of cancellation.
              </p>
              <p>
                The Business will determine and communicate any applicable deductions or adjustments in writing.
              </p>

              <h2>Contact Information</h2>
              <p>
                For questions about these terms or your rental, contact us at:
              </p>
              <ul>
                <li>Phone: (252) 622-7921</li>
                <li>Email: cody@3mtrailerrental.com</li>
                <li>Address: 1272 Chatham Street, Newport, NC 28570</li>
              </ul>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}