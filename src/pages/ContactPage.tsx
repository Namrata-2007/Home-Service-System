import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  ChevronDown, 
  CheckCircle2,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { submitInquiry, currentUser } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [category, setCategory] = useState('General Service Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }

    submitInquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '+1 (555) 000-0000',
      category: category,
      message: message.trim()
    });

    setSubmitted(true);
    setMessage('');
  };

  const faqs = [
    {
      q: 'How quickly can a technician reach my home?',
      a: 'We offer standard 3-hour arrival windows throughout Springfield. For emergency water leaks or electrical trips, emergency dispatch typically reaches you within 60 to 90 minutes.'
    },
    {
      q: 'What is the 30-day workmanship warranty?',
      a: 'If any repaired pipe leaks, electrical switch fails, or cleaned area shows issues within 30 days of service, we will dispatch our supervisor to inspect and resolve it completely free of charge.'
    },
    {
      q: 'Do I have to pay anything in advance?',
      a: 'No upfront deposit is required for residential tasks. You inspect the work first, and only settle the fixed bill with your technician via cash, card, or UPI after 100% satisfaction.'
    },
    {
      q: 'Are replacement parts and materials included in the base price?',
      a: 'The base rate covers expert labor, diagnostic inspection, and standard minor consumables (washers, thread seals, tape). If major parts are needed (e.g. new MCB switch, fan motor, replacement faucet), our technician provides an itemized retail invoice for your approval before installation.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            We Are Here To Help
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact HomeServe Operations
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Have questions about a service, commercial maintenance contracts, or need immediate assistance? Reach our customer desk.
          </p>
        </div>

        {/* 2-Column Grid: Contact Cards & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-bold text-slate-900 text-lg">Direct Contact Details</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">24/7 Helpline & Dispatch</p>
                    <p className="text-blue-700 font-semibold text-sm mt-0.5">+1 (800) 555-HOME</p>
                    <p className="text-slate-500 text-[11px]">Toll-free across Springfield region</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Email Support</p>
                    <p className="text-slate-800 font-medium mt-0.5">support@homeserve.com</p>
                    <p className="text-slate-500 text-[11px]">Average reply within 2 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Central Service Operations Center</p>
                    <p className="text-slate-800 font-medium mt-0.5">742 Evergreen Plaza, Suite 400</p>
                    <p className="text-slate-500 text-[11px]">Springfield, IL 62704</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Operating Schedule</p>
                    <p className="text-slate-800 font-medium mt-0.5">Monday – Sunday: 7:00 AM – 10:00 PM</p>
                    <p className="text-emerald-600 font-semibold text-[11px]">Emergency technicians on standby 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-5 rounded-2xl shadow-sm flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white text-sm">100% Satisfaction Guarantee</p>
                <p className="text-blue-100 mt-0.5">Every inquiry is logged with a tracking ticket number.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-lg">Send Us an Inquiry</h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your query below and our supervisor will contact you via phone or email.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Thank You! Your Message Was Received</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Our customer desk has logged your request into the MySQL database. We will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Miller"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="david@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Inquiry Subject</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:border-blue-500"
                    >
                      <option value="General Service Inquiry">General Service Inquiry</option>
                      <option value="Commercial / Office Contract">Commercial / Office Contract</option>
                      <option value="Emergency Service Follow-up">Emergency Service Follow-up</option>
                      <option value="Billing / Invoice Query">Billing / Invoice Query</option>
                      <option value="Join as Certified Technician">Join as Certified Technician</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Message or Problem Description *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you need help with, your preferred timing, or any specific concerns..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 text-sm shadow-sm hover:shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Operations</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ ACCORDION SECTION */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-lg">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-100/60 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-2 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
