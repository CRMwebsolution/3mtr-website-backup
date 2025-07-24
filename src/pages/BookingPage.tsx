import React, { useState, useEffect } from 'react';
import { X, Calendar, Truck, User, Phone, FileText, Upload, Clock, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const TRAILER_MAP = {
  '1e96b948-447a-438f-b78b-36a8adc67437': 'Car Trailer',
  '2022cd45-dda9-4705-ad65-499b2280ba62': 'Utility Trailer',
  '78ca4e56-fc5b-47db-bcbd-48df66e19e7f': 'Enclosed Trailer'
};

function formatDateMMDDYYYY(date) {
  const d = new Date(date);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

export default function BookingPage() {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [availableTrailers, setAvailableTrailers] = useState([]);
  const [isLoadingTrailers, setIsLoadingTrailers] = useState(false);

  // Return customer flow
  const [isReturnCustomerFlow, setIsReturnCustomerFlow] = useState(false);
  const [showPhoneNumberPrompt, setShowPhoneNumberPrompt] = useState(false);
  const [returnCustomerPhone, setReturnCustomerPhone] = useState('');
  const [isCheckingCustomer, setIsCheckingCustomer] = useState(false);
  const [customerCheckError, setCustomerCheckError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    trailer_type: '',
    pickup_date: '',
    days_needed: '1',
    vehicle_info: '',
    plate_number: '',
    contact_method: 'text',
    hauling: '',
    comments: '',
    license_upload: null,
    insurance_upload: null
  });

  const [errors, setErrors] = useState({});

  // Helper: Get all dates in a booking span for availability checking
  function getDatesInRange(start, numDays) {
    const dates = [];
    let current = new Date(start);
    for (let i = 0; i < numDays; i++) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  // Load available trailers when pickup_date or days_needed changes
  useEffect(() => {
    const pickup = formData.pickup_date;
    const duration = parseInt(formData.days_needed || '1');
    if (pickup && duration > 0) {
      loadAvailableTrailers(pickup, duration);
    } else {
      setAvailableTrailers([]);
    }
    // eslint-disable-next-line
  }, [formData.pickup_date, formData.days_needed]);

  const loadAvailableTrailers = async (pickup, duration) => {
    setIsLoadingTrailers(true);
    try {
      const dateList = getDatesInRange(pickup, duration);
      // Query all unavailable trailer_ids for ANY date in the range
      const { data, error } = await supabase
        .from('availability')
        .select('trailer_id, date')
        .in('date', dateList)
        .eq('status', 'unavailable');
      if (error) {
        setAvailableTrailers([]);
        return;
      }
      const unavailableIds = new Set(data?.map(r => r.trailer_id) || []);
      const available = Object.entries(TRAILER_MAP)
        .filter(([id]) => !unavailableIds.has(id))
        .map(([id, name]) => ({ id, name }));
      setAvailableTrailers(available);
      if (formData.trailer_type && unavailableIds.has(formData.trailer_type)) {
        setFormData(prev => ({ ...prev, trailer_type: '' }));
      }
    } catch (e) {
      setAvailableTrailers([]);
    } finally {
      setIsLoadingTrailers(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Calculate dropoff/return date for display to user
  let dropoffDate = '';
  if (formData.pickup_date && formData.days_needed && Number(formData.days_needed) > 0) {
    const d = new Date(formData.pickup_date);
    d.setDate(d.getDate() + Number(formData.days_needed));
    dropoffDate = formatDateMMDDYYYY(d);
  }

  // Handle return customer check
  const handleReturnCustomerCheck = async () => {
    if (!returnCustomerPhone.trim()) {
      setCustomerCheckError('Please enter a phone number');
      return;
    }
    setIsCheckingCustomer(true);
    setCustomerCheckError(null);
    try {
      const response = await fetch('https://hook.us2.make.com/abitgapvjify4mkeu5d7njrd5u63ajl5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{ phone: returnCustomerPhone.replace(/\D/g, '') }])
      });
      if (!response.ok) throw new Error('Failed to check customer status');
      const customerData = await response.json();
      if (
        customerData && customerData.phone && customerData.phone.trim() !== '' &&
        customerData.Name && customerData.Name.trim() !== ''
      ) {
        setFormData(prev => ({
          ...prev,
          name: customerData.Name.trim(),
          phone: customerData.phone || returnCustomerPhone,
          vehicle_info: customerData.Vehicle || ''
        }));
        setIsReturnCustomerFlow(true);
        setShowPhoneNumberPrompt(false);
        setReturnCustomerPhone('');
      } else {
        setCustomerCheckError('Phone number not found in our system. Please use the regular booking form.');
      }
    } catch (error) {
      setCustomerCheckError('Unable to check customer status. Please try again or use the regular booking form.');
    } finally {
      setIsCheckingCustomer(false);
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) newErrors.phone = 'Please enter a valid 10-digit phone number';
    if (!formData.trailer_type) newErrors.trailer_type = 'Please select a trailer';
    if (!formData.pickup_date) newErrors.pickup_date = 'Pickup date is required';
    if (!formData.days_needed || parseInt(formData.days_needed) < 1) newErrors.days_needed = 'Please enter a valid number of days';
    if (!formData.vehicle_info.trim()) newErrors.vehicle_info = 'Vehicle information is required';
    if (!formData.hauling.trim()) newErrors.hauling = 'Please describe what you\'re hauling';
    if (!isReturnCustomerFlow) {
      if (!formData.plate_number.trim()) newErrors.plate_number = 'Plate number is required';
      if (!formData.license_upload) newErrors.license_upload = 'Driver\'s license upload is required';
      if (!formData.insurance_upload) newErrors.insurance_upload = 'Insurance upload is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          submitData.append(key, value);
        } else if (value !== null) {
          if (key === 'trailer_type') {
            const trailerName = TRAILER_MAP[value.toString()] || value.toString();
            submitData.append(key, trailerName);
          } else {
            submitData.append(key, value.toString());
          }
        }
      });
      submitData.append('is_return_customer', isReturnCustomerFlow.toString());
      const response = await fetch('https://hook.us2.make.com/l6f4loxs0qqws9ds1rr3xtyxrs3w9o48', {
        method: 'POST',
        body: submitData
      });
      if (!response.ok) throw new Error('Submission failed');
      setShowThankYou(true);
    } catch (error) {
      alert('There was an error submitting your booking. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Thank you page
  if (showThankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-orange-50">
        <SEOHead title="Booking Submitted | 3M Trailer Rental" />
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your booking request. We'll contact you soon to confirm your reservation.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#FF6600] hover:bg-[#ff8533] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <SEOHead
        title="Book Your Trailer Rental | 3M Trailer Rental"
        description="Easy online trailer booking for car haulers, enclosed trailers, and utility trailers. Reserve your trailer rental in Eastern North Carolina today."
        url="https://3mtrailerrental.com/booking"
      />
      <Header />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-[#FF6600] hover:text-[#ff8533] mb-6 transition-colors"
              aria-label="Exit booking"
            >
              <X className="w-5 h-5 mr-2" />
              Exit Booking
            </button>
            <h1 className="text-4xl font-bold text-[#003366] mb-4">Book Your Trailer</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Fill out the form below to reserve your trailer. We'll contact you to confirm availability and arrange pickup details. 
              <br /> A card must be kept on file for all rentals.
            </p>
            {/* Return Customer Button */}
            {!isReturnCustomerFlow && (
              <button
                onClick={() => setShowPhoneNumberPrompt(true)}
                className="inline-flex items-center px-6 py-3 bg-[#003366] hover:bg-[#004080] text-white font-semibold rounded-lg transition-colors shadow-lg"
                aria-label="Check if you are a return customer"
              >
                <UserCheck className="w-5 h-5 mr-2" />
                Return Customer? Click Here
              </button>
            )}
            {isReturnCustomerFlow && (
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                <UserCheck className="w-5 h-5 mr-2" />
                Welcome back! Some fields have been pre-filled for you.
              </div>
            )}
          </div>
          {/* Phone Number Prompt Modal */}
          {showPhoneNumberPrompt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <div className="text-center mb-6">
                  <UserCheck className="w-12 h-12 text-[#FF6600] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#003366] mb-2">Return Customer</h3>
                  <p className="text-gray-600">
                    Enter your phone number to check if you're in our system and auto-fill your information.
                  </p>
                </div>
                {customerCheckError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    {customerCheckError}
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="return-customer-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="return-customer-phone"
                      type="tel"
                      value={returnCustomerPhone}
                      onChange={e => setReturnCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                      placeholder="252-622-7921"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowPhoneNumberPrompt(false);
                        setReturnCustomerPhone('');
                        setCustomerCheckError(null);
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label="Cancel"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReturnCustomerCheck}
                      disabled={isCheckingCustomer}
                      className="flex-1 px-4 py-3 bg-[#FF6600] hover:bg-[#ff8533] text-white rounded-lg transition-colors disabled:opacity-50"
                      aria-label="Check phone number"
                    >
                      {isCheckingCustomer ? 'Checking...' : 'Check'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#003366] to-[#004080] p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                Rental Information
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-[#FF6600]" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2 text-[#FF6600]" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="252-622-7921"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              {/* Rental Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-[#FF6600]" />
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    value={formData.pickup_date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => handleInputChange('pickup_date', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                      errors.pickup_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pickup_date && <p className="text-red-500 text-sm mt-1">{errors.pickup_date}</p>}
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 mr-2 text-[#FF6600]" />
                    Number of Days *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.days_needed}
                    onChange={e => handleInputChange('days_needed', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                      errors.days_needed ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Number of days"
                  />
                  {errors.days_needed && <p className="text-red-500 text-sm mt-1">{errors.days_needed}</p>}
                </div>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Truck className="w-4 h-4 mr-2 text-[#FF6600]" />
                  Trailer *
                </label>
                <select
                  value={formData.trailer_type}
                  onChange={e => handleInputChange('trailer_type', e.target.value)}
                  disabled={!formData.pickup_date || !formData.days_needed || isLoadingTrailers}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                    errors.trailer_type ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">
                    {!formData.pickup_date || !formData.days_needed
                      ? 'Select date and duration first'
                      : isLoadingTrailers
                      ? 'Checking availability...'
                      : availableTrailers.length === 0
                      ? 'No trailers available'
                      : 'Choose a trailer'}
                  </option>
                  {availableTrailers.map(trailer => (
                    <option key={trailer.id} value={trailer.id}>
                      {trailer.name}
                    </option>
                  ))}
                </select>
                {availableTrailers.length === 0 &&
                  !!formData.pickup_date &&
                  !!formData.days_needed &&
                  !isLoadingTrailers && (
                    <p className="text-amber-600 text-sm mt-1">
                      No trailers available for that date and duration.
                    </p>
                  )}
                {errors.trailer_type && <p className="text-red-500 text-sm mt-1">{errors.trailer_type}</p>}
              </div>
              {/* Vehicle and Hauling Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tow Vehicle (Year, Make, Model) *
                  </label>
                  <input
                    type="text"
                    value={formData.vehicle_info}
                    onChange={e => handleInputChange('vehicle_info', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                      errors.vehicle_info ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="2020 Ford F-150"
                  />
                  {errors.vehicle_info && <p className="text-red-500 text-sm mt-1">{errors.vehicle_info}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    What are you hauling? *
                  </label>
                  <input
                    type="text"
                    value={formData.hauling}
                    onChange={e => handleInputChange('hauling', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                      errors.hauling ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Furniture, equipment, vehicle, etc."
                  />
                  {errors.hauling && <p className="text-red-500 text-sm mt-1">{errors.hauling}</p>}
                </div>
              </div>
              {/* Plate Number, License and Insurance Uploads */}
              {!isReturnCustomerFlow && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        License Plate Number *
                      </label>
                      <input
                        type="text"
                        value={formData.plate_number}
                        onChange={e => handleInputChange('plate_number', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                          errors.plate_number ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="ABC-1234"
                      />
                      {errors.plate_number && <p className="text-red-500 text-sm mt-1">{errors.plate_number}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Upload className="w-4 h-4 mr-2 text-[#FF6600]" />
                        Driver's License *
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={e => handleInputChange('license_upload', e.target.files?.[0] || null)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                          errors.license_upload ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.license_upload && <p className="text-red-500 text-sm mt-1">{errors.license_upload}</p>}
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 mr-2 text-[#FF6600]" />
                        Insurance Information *
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={e => handleInputChange('insurance_upload', e.target.files?.[0] || null)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6600] ${
                          errors.insurance_upload ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.insurance_upload && <p className="text-red-500 text-sm mt-1">{errors.insurance_upload}</p>}
                    </div>
                  </div>
                </>
              )}
              {/* Comments */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Questions or Comments
                </label>
                <textarea
                  value={formData.comments}
                  onChange={e => handleInputChange('comments', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600]"
                  placeholder="Any special requirements or questions?"
                />
              </div>
              {/* Submit Button */}
              <div className="border-t pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting || availableTrailers.length === 0}
                  className="w-full bg-gradient-to-r from-[#FF6600] to-[#ff8533] hover:from-[#ff8533] hover:to-[#FF6600] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Booking...' : 'Submit Booking Request'}
                </button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our rental{' '}
                  <a 
                    href="/terms-and-conditions" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#FF6600] hover:text-[#ff8533] underline"
                  >
                    terms and conditions
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}