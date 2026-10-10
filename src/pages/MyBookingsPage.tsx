import React, { useState } from 'react';
import { 
  ClipboardList, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Clock4, 
  AlertCircle, 
  Printer, 
  Star, 
  XCircle, 
  Phone, 
  User as UserIcon,
  MessageSquare,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking, BookingStatus } from '../types';

export const MyBookingsPage: React.FC = () => {
  const { 
    bookings, 
    currentUser, 
    cancelBooking, 
    rateBooking, 
    setInvoiceBooking, 
    setCurrentPage,
    setIsBookingModalOpen,
    services,
    setServiceToBook,
    setIsAuthModalOpen
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Completed' | 'Cancelled'>('All');
  
  // Rating modal state
  const [ratingBookingTarget, setRatingBookingTarget] = useState<Booking | null>(null);
  const [starRating, setStarRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // If user is logged in, show their bookings. If not logged in, show sample or prompt to sign in.
  const userBookings = currentUser 
    ? bookings.filter(b => b.userId === currentUser.id || b.userEmail.toLowerCase() === currentUser.email.toLowerCase())
    : bookings.slice(0, 3); // Preview sample for anonymous users

  const filteredBookings = userBookings.filter(b => {
    if (filterStatus === 'Active') {
      return b.status !== 'Completed' && b.status !== 'Cancelled';
    }
    if (filterStatus === 'Completed') return b.status === 'Completed';
    if (filterStatus === 'Cancelled') return b.status === 'Cancelled';
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">⏳ Pending Confirmation</span>;
      case 'Confirmed':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 border border-blue-200">✔️ Confirmed</span>;
      case 'Technician Assigned':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">👷 Technician Assigned</span>;
      case 'In Progress':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-800 border border-purple-200 animate-pulse">⚡ Service In Progress</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">✅ Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 border border-red-200">❌ Cancelled</span>;
      default:
        return null;
    }
  };

  const getStepIndex = (status: BookingStatus) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Confirmed': return 2;
      case 'Technician Assigned': return 3;
      case 'In Progress': return 4;
      case 'Completed': return 5;
      case 'Cancelled': return -1;
      default: return 1;
    }
  };

  const handleOpenRating = (booking: Booking) => {
    setRatingBookingTarget(booking);
    setStarRating(booking.userRating || 5);
    setReviewText(booking.userReview || '');
  };

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (ratingBookingTarget) {
      rateBooking(ratingBookingTarget.id, starRating, reviewText);
      setRatingBookingTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Customer Portal
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
              My Service Bookings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track technician arrival, manage schedules, and download invoices
            </p>
          </div>

          <button
            onClick={() => {
              setServiceToBook(services[0] || null);
              setIsBookingModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Service</span>
          </button>
        </div>

        {/* Unauthenticated notice */}
        {!currentUser && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-900">
            <div className="flex items-center gap-2.5">
              <UserIcon className="w-5 h-5 text-blue-600 shrink-0" />
              <span>You are viewing demo bookings. Sign in to sync your personal bookings and saved address.</span>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg shrink-0 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        )}

        {/* Status Filter Tabs */}
        <div className="flex border-b border-slate-200 space-x-2 text-xs font-bold">
          {(['All', 'Active', 'Completed', 'Cancelled'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`pb-3 px-4 border-b-2 transition cursor-pointer ${
                filterStatus === tab
                  ? 'border-blue-600 text-blue-700 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab} Bookings
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <ClipboardList className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No {filterStatus.toLowerCase()} bookings found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You do not have any bookings in this section. Browse our catalog and book an appointment in under a minute!
            </p>
            <button
              onClick={() => setCurrentPage('services')}
              className="bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
            >
              Explore Services
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map(booking => {
              const currentStep = getStepIndex(booking.status);

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-200 transition p-6 space-y-6"
                >
                  {/* Top Row: Service info & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          #{booking.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {booking.serviceCategory}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {booking.serviceName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  {/* Visual Status Progress Tracker (if not cancelled) */}
                  {booking.status !== 'Cancelled' ? (
                    <div className="py-2">
                      <div className="grid grid-cols-5 text-center gap-2 relative">
                        {/* Connecting line */}
                        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0"></div>

                        {[
                          { label: 'Booked', num: 1 },
                          { label: 'Confirmed', num: 2 },
                          { label: 'Tech Assigned', num: 3 },
                          { label: 'In Progress', num: 4 },
                          { label: 'Completed', num: 5 }
                        ].map(stepItem => {
                          const isDone = currentStep >= stepItem.num;
                          const isCurrent = currentStep === stepItem.num;

                          return (
                            <div key={stepItem.num} className="relative z-10 flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition ${
                                  isDone
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-slate-400 border-slate-300'
                                } ${isCurrent ? 'ring-4 ring-blue-100 scale-110' : ''}`}
                              >
                                {isDone ? '✓' : stepItem.num}
                              </div>
                              <span className={`text-[11px] mt-1.5 font-medium leading-tight ${
                                isDone ? 'text-blue-900 font-bold' : 'text-slate-400'
                              }`}>
                                {stepItem.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-xs text-red-800 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>This appointment has been cancelled. No charges apply.</span>
                    </div>
                  )}

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                        Appointment Schedule
                      </span>
                      <p className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        {booking.bookingDate}
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {booking.timeSlot}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                        Location Address
                      </span>
                      <p className="flex items-start gap-1.5 text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>
                          {booking.address.street} {booking.address.apartment && `, ${booking.address.apartment}`}
                          <br />
                          {booking.address.city}, {booking.address.zipCode}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                        Payment & Amount
                      </span>
                      <p className="text-slate-800 font-bold text-sm text-blue-700 font-mono">
                        ₹{booking.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-slate-600">
                        Mode: {booking.paymentMethod} ({booking.paymentStatus})
                      </p>
                    </div>
                  </div>

                  {/* Assigned Technician Card (if assigned) */}
                  {booking.technician && (
                    <div className="flex items-center justify-between p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.technician.avatar}
                          alt={booking.technician.name}
                          className="w-10 h-10 rounded-full object-cover border border-blue-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{booking.technician.name}</p>
                          <p className="text-slate-500">Certified {booking.technician.specialty} Specialist</p>
                          <div className="flex items-center gap-1 text-amber-500 mt-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="font-bold">{booking.technician.rating} Rating</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={`tel:${booking.technician.phone}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg font-semibold transition"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Technician</span>
                      </a>
                    </div>
                  )}

                  {/* User Review Display if already rated */}
                  {booking.userRating && (
                    <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs space-y-1">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(booking.userRating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="font-bold text-slate-800 ml-1">Your Feedback</span>
                      </div>
                      <p className="text-slate-700 italic">"{booking.userReview}"</p>
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <button
                      onClick={() => setInvoiceBooking(booking)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-slate-500" />
                      <span>View & Print Invoice</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {booking.status === 'Completed' && !booking.userRating && (
                        <button
                          onClick={() => handleOpenRating(booking)}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                          <span>Rate Service</span>
                        </button>
                      )}

                      {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* RATING & REVIEW MODAL */}
        {ratingBookingTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900">
                Rate Service: {ratingBookingTarget.serviceName}
              </h3>
              <p className="text-xs text-slate-500">
                How satisfied were you with the quality of repair and technician etiquette?
              </p>

              {/* Star selection */}
              <div className="flex items-center gap-2 justify-center py-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStarRating(star)}
                    className="p-1 cursor-pointer transition hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= starRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                placeholder="Write a few words about your experience (e.g. Prompt arrival, neat work)..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
              />

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setRatingBookingTarget(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitRating}
                  className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
