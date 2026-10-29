import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Tag,
  ArrowRight,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';

export const BookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    setIsBookingModalOpen, 
    serviceToBook, 
    services, 
    currentUser, 
    createBooking, 
    setCurrentPage, 
    setInvoiceBooking,
    setIsAuthModalOpen
  } = useApp();

  const [selectedServiceId, setSelectedServiceId] = useState<number>(1);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('09:00 AM - 12:00 PM');
  
  // Customer details
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('Pune');
  const [zipCode, setZipCode] = useState('411038');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Online (Simulated)' | 'UPI / Card'>('Cash on Delivery');
  
  // Promo code
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState('');

  // Step state: 1 = Form, 2 = Confirmed Success
  const [step, setStep] = useState<1 | 2>(1);
  const [createdBookingResult, setCreatedBookingResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Tomorrow's date for minimum selection
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split('T')[0];

  useEffect(() => {
    if (serviceToBook) {
      setSelectedServiceId(serviceToBook.id);
    } else if (services.length > 0) {
      setSelectedServiceId(services[0].id);
    }
  }, [serviceToBook, services]);

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.name || '');
      setUserEmail(currentUser.email || '');
      setUserPhone(currentUser.phone || '');
      if (currentUser.address) {
        setStreetAddress(currentUser.address);
      }
    }
    // Default booking date to tomorrow
    setBookingDate(minDateString);
  }, [currentUser, minDateString]);

  if (!isBookingModalOpen) return null;

  const currentSelectedService: ServiceItem | undefined = 
    services.find(s => s.id === selectedServiceId) || services[0];

  const basePrice = currentSelectedService ? currentSelectedService.basePrice : 0;
  const finalTotal = Math.max(0, basePrice - discount);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME50' || code === 'FIRSTHOME') {
      const disc = 50;
      setDiscount(disc);
      setCouponAppliedMessage(`Promo code applied! ₹${disc} savings added.`);
    } else if (code === 'SAVE100') {
      const disc = 100;
      setDiscount(disc);
      setCouponAppliedMessage(`Promo code applied! ₹${disc} savings added.`);
    } else {
      setCouponAppliedMessage('Invalid coupon code. Try WELCOME50 or SAVE100');
      setDiscount(0);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!userName.trim() || !userEmail.trim() || !userPhone.trim() || !streetAddress.trim()) {
      setErrorMsg('Please fill out your name, contact phone, email, and service address.');
      return;
    }

    if (!bookingDate) {
      setErrorMsg('Please select a valid service appointment date.');
      return;
    }

    if (!currentSelectedService) {
      setErrorMsg('Please select a valid service.');
      return;
    }

    const newBooking = createBooking({
      userId: currentUser ? currentUser.id : 1,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      userPhone: userPhone.trim(),
      serviceId: currentSelectedService.id,
      serviceName: currentSelectedService.name,
      serviceCategory: currentSelectedService.category,
      servicePrice: currentSelectedService.basePrice,
      serviceDuration: currentSelectedService.durationHours,
      bookingDate: bookingDate,
      timeSlot: timeSlot,
      address: {
        street: streetAddress.trim(),
        apartment: apartment.trim(),
        city: city.trim(),
        zipCode: zipCode.trim(),
        notes: notes.trim()
      },
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'Online (Simulated)' ? 'Paid' : 'Pending',
      discountApplied: discount,
      totalAmount: finalTotal
    });

    setCreatedBookingResult(newBooking);
    setStep(2);
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setStep(1);
    setDiscount(0);
    setCouponCode('');
    setCouponAppliedMessage('');
    setErrorMsg('');
  };

  const handleGoToBookings = () => {
    handleClose();
    setCurrentPage('bookings');
  };

  const handleViewInvoice = () => {
    if (createdBookingResult) {
      setInvoiceBooking(createdBookingResult);
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-auto overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-5 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Calendar className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Book a Home Service</h2>
              <p className="text-xs text-blue-100">Simple 1-minute scheduling • No upfront advance required</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {step === 1 ? (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  1. Select Service & Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <select
                    value={selectedServiceId}
                    onChange={e => setSelectedServiceId(Number(e.target.value))}
                    className="w-full text-sm border border-slate-200 rounded-xl p-3 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-blue-500 font-medium"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.id}>
                        [{s.category}] {s.name} — ₹{s.basePrice}
                      </option>
                    ))}
                  </select>

                  {/* Quick Highlight Card */}
                  {currentSelectedService && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200/70 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          {currentSelectedService.category}
                        </span>
                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          Duration: ~{currentSelectedService.durationHours} hrs
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 line-through mr-1 font-mono">₹{currentSelectedService.basePrice + 200}</span>
                        <span className="text-xl font-bold text-blue-700 font-mono">₹{currentSelectedService.basePrice}</span>
                      </div>
                    </div>
                  )}
                </div>

                {currentSelectedService && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-800">What's included:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      {currentSelectedService.inclusions.slice(0, 3).map((inc, i) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 2. Date & Time Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  2. Choose Preferred Date & Time
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1 font-medium">Service Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="date"
                        required
                        min={minDateString}
                        value={bookingDate}
                        onChange={e => setBookingDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 mb-1 font-medium">Arrival Time Slot</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <select
                        value={timeSlot}
                        onChange={e => setTimeSlot(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:border-blue-500"
                      >
                        <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                        <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                        <option value="03:00 PM - 06:00 PM">Late Afternoon (03:00 PM - 06:00 PM)</option>
                        <option value="06:00 PM - 09:00 PM">Evening (06:00 PM - 09:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Address & Contact Details */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    3. Service Location & Customer Contact
                  </label>
                  {!currentUser && (
                    <button
                      type="button"
                      onClick={() => setIsAuthModalOpen(true)}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Already have an account? Sign In
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={userPhone}
                      onChange={e => setUserPhone(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="aarav.sharma@example.com"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-500 mb-1">Street / Area / Society *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Green Valley Residency, Paud Road, Kothrud"
                      value={streetAddress}
                      onChange={e => setStreetAddress(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Flat / Wing / House No.</label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 402, Wing A"
                      value={apartment}
                      onChange={e => setApartment(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={e => setZipCode(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 mb-1">Service Instructions / Landmark (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Master bathroom tap is loose; please bring 1/2 inch connector washers."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              {/* 4. Payment Preference & Promo */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  4. Payment Option & Summary
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-3 text-left rounded-xl border text-xs transition cursor-pointer ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-semibold text-slate-900">💵 Pay After Service</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Cash or card upon job completion</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Online (Simulated)')}
                    className={`p-3 text-left rounded-xl border text-xs transition cursor-pointer ${
                      paymentMethod === 'Online (Simulated)'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-semibold text-slate-900">💳 Card Payment</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Instant simulated confirmation</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI / Card')}
                    className={`p-3 text-left rounded-xl border text-xs transition cursor-pointer ${
                      paymentMethod === 'UPI / Card'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-semibold text-slate-900">📱 UPI / QR Code</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Scan technician code after job</p>
                  </button>
                </div>

                {/* Coupon input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Have a coupon? e.g. WELCOME10"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-2 text-xs font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {couponAppliedMessage && (
                  <p className={`text-xs ${discount > 0 ? 'text-emerald-600 font-semibold' : 'text-amber-600'}`}>
                    {couponAppliedMessage}
                  </p>
                )}

                {/* Bill Breakdown */}
                <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Base Service Charge:</span>
                    <span className="font-mono">₹{basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Inspection & Visiting Fee:</span>
                    <span>₹0.00 (Free)</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount:</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                    <span>Total Estimated Amount:</span>
                    <span className="text-blue-700 font-mono text-base">₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-base active:scale-99"
              >
                <span>Confirm & Place Booking</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            /* Step 2: Booking Confirmed Success View */
            <div className="text-center py-6 px-4 space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Booking Confirmed
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  Service Scheduled Successfully!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your technician will arrive at the scheduled time slot.
                </p>
              </div>

              {createdBookingResult && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs max-w-md mx-auto space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Booking Reference ID:</span>
                    <span className="font-mono font-bold text-blue-700 text-sm">
                      {createdBookingResult.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-semibold text-slate-800">{createdBookingResult.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Slot:</span>
                    <span className="font-semibold text-slate-800">{createdBookingResult.bookingDate} ({createdBookingResult.timeSlot})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Address:</span>
                    <span className="font-semibold text-slate-800 text-right max-w-[200px] truncate">
                      {createdBookingResult.address.street}, {createdBookingResult.address.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment:</span>
                    <span className="font-semibold text-slate-800">{createdBookingResult.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900">
                    <span>Total Amount:</span>
                    <span className="text-blue-700 font-mono text-sm">₹{createdBookingResult.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleGoToBookings}
                  className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  View in My Bookings
                </button>
                <button
                  type="button"
                  onClick={handleViewInvoice}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-slate-600" />
                  Print Receipt / Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
