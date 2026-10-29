import React, { useState } from 'react';
import { 
  Wrench, 
  Zap, 
  Sparkles, 
  Flame, 
  Paintbrush, 
  Hammer, 
  ShieldCheck, 
  Clock, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  ThumbsUp, 
  PhoneCall,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCategory, ServiceItem } from '../types';

export const HomePage: React.FC = () => {
  const { 
    services, 
    setCurrentPage, 
    startBookingForService, 
    setIsBookingModalOpen,
    setServiceToBook
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: { label: ServiceCategory | 'All'; icon: React.ReactNode; desc: string }[] = [
    { label: 'All', icon: <Sparkles className="w-5 h-5" />, desc: 'All Services' },
    { label: 'Plumbing', icon: <Wrench className="w-5 h-5" />, desc: 'Pipes, Taps & Drains' },
    { label: 'Electrical', icon: <Zap className="w-5 h-5" />, desc: 'Wiring, MCBs & Fans' },
    { label: 'House Cleaning', icon: <Sparkles className="w-5 h-5" />, desc: 'Deep Home Scrub' },
    { label: 'Appliance Repair', icon: <Flame className="w-5 h-5" />, desc: 'AC, Fridge, Washing' },
    { label: 'Painting', icon: <Paintbrush className="w-5 h-5" />, desc: 'Interior & Exterior' },
    { label: 'Carpentry', icon: <Hammer className="w-5 h-5" />, desc: 'Doors, Locks & Wood' }
  ];

  const filteredServices = services.filter(service => {
    const matchesCat = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white pt-16 pb-24 md:pt-20 md:pb-28">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-indigo-300 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>#1 Rated Professional Home Service Network</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Quality Home Services, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-white">
                  Right at Your Doorstep.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Connect with certified plumbers, electricians, deep-cleaners, and appliance specialists. Transparent pricing, zero upfront charges, and 30-day workmanship assurance.
              </p>

              {/* Instant Search Bar */}
              <div className="bg-white p-2 rounded-2xl shadow-xl max-w-xl mx-auto lg:mx-0 flex items-center gap-2 border border-blue-100">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Try 'AC repair', 'tap leak', 'kitchen cleaning'..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden py-2"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('available-services-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition cursor-pointer shrink-0 shadow-sm"
                >
                  Find Service
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    setServiceToBook(services[0] || null);
                    setIsBookingModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-50 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition active:scale-95 cursor-pointer text-sm"
                >
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Schedule Service Now</span>
                </button>

                <button
                  onClick={() => setCurrentPage('services')}
                  className="flex items-center gap-2 bg-blue-800/80 hover:bg-blue-800 text-white font-semibold px-6 py-3.5 rounded-xl border border-blue-600/60 transition cursor-pointer text-sm"
                >
                  <span>Explore Price Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-blue-600/40 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-extrabold text-white">15,000+</p>
                  <p className="text-xs text-blue-200">Homes Serviced</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">4.9 / 5</p>
                  <p className="text-xs text-blue-200">Verified Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">30 Days</p>
                  <p className="text-xs text-blue-200">Free Warranty</p>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                    Popular Right Now
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    ⚡ Available Today
                  </span>
                </div>

                {/* Hero featured snippet */}
                <div className="bg-white rounded-2xl p-4 text-slate-800 shadow-md space-y-3">
                  <div className="flex gap-3">
                    <img
                      src={services[0]?.imageUrl}
                      alt={services[0]?.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {services[0]?.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                        {services[0]?.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {services[0]?.shortDesc}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-base font-extrabold text-blue-700 font-mono">
                          ₹{services[0]?.basePrice}
                        </span>
                        <span className="text-xs text-slate-400">• ~{services[0]?.durationHours} hrs</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => startBookingForService(services[0])}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book This Service (₹{services[0]?.basePrice})
                  </button>
                </div>

                {/* Secondary quick perks */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-blue-900/40 p-2.5 rounded-xl border border-blue-400/20 flex items-center gap-2 text-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fixed upfront price</span>
                  </div>
                  <div className="bg-blue-900/40 p-2.5 rounded-xl border border-blue-400/20 flex items-center gap-2 text-blue-100">
                    <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>On-time arrival</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORY CHIPS */}
      <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                  selectedCategory === cat.label
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-blue-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Effortless Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            How HomeServe Works
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Booking home repairs should never be a chore. Get help in 4 simple steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 relative">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-lg mx-auto">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Select Service</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Browse our catalog of plumbing, electrical, cleaning, and painting tasks with upfront prices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 relative">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-lg mx-auto">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Choose Date & Slot</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pick your preferred arrival window and enter your residential address & instructions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 relative">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-lg mx-auto">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Verified Pro Arrives</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              A background-checked, equipped specialist arrives equipped with genuine tools and parts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 relative">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-lg mx-auto">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">Pay After Service</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inspect the job to your 100% satisfaction, then pay conveniently by cash, card, or UPI.
            </p>
          </div>
        </div>
      </section>

      {/* AVAILABLE SERVICES GRID */}
      <section id="available-services-grid" className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Our Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Available Home Services
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredServices.length} vetted home solutions across Pune & Mumbai
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('services')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer self-start md:self-auto"
            >
              <span>View All Detailed Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <div 
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-900 font-bold text-[11px] px-2.5 py-1 rounded-lg shadow-xs">
                    {service.category}
                  </div>
                  {service.popular && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Popular
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs mb-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800">{service.rating.toFixed(1)}</span>
                      <span className="text-slate-400">({service.reviewCount} reviews)</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Standard Rate</p>
                      <p className="text-xl font-extrabold text-blue-700 font-mono">
                        ₹{service.basePrice.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => startBookingForService(service)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs hover:shadow-sm flex items-center gap-1.5 active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE HOMESERVE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              The HomeServe Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Indian Homeowners Trust Us Daily
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              We eliminate the frustration of untrustworthy handymen, hidden surcharges, and delayed appointments. Our platform delivers vetted excellence.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Strict Background Verification</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Every plumber, electrician, and technician undergoes a national criminal history check and trade certification audit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">30-Day Workmanship Warranty</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    If an issue resurfaces within 30 days of service completion, we revisit and repair it at zero extra cost.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Guaranteed On-Time Arrival</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Technicians arrive precisely inside your chosen 3-hour window. Real-time notifications keep you informed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote Card */}
          <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
            <div className="flex items-center gap-1 text-amber-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-300" />
              ))}
            </div>

            <p className="text-base sm:text-lg italic font-medium leading-relaxed text-blue-50">
              "When our kitchen sink pipe burst on a Sunday afternoon, HomeServe sent technician Rajesh Patil within two hours. He replaced the cracked pipe, cleared the drain, and left the area spotless. Truly lifesavers!"
            </p>

            <div className="flex items-center gap-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                alt="Ananya Kulkarni"
                className="w-12 h-12 rounded-full object-cover border-2 border-white/40"
              />
              <div>
                <p className="font-bold text-sm text-white">Ananya Kulkarni</p>
                <p className="text-xs text-blue-200">Kothrud, Pune Homeowner • Plumb & Drain Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Fix Your Home Today?
          </h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Book now and pay only after you are 100% satisfied with the work. No advance payment required.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setServiceToBook(services[0] || null);
                setIsBookingModalOpen(true);
              }}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-xl shadow-lg transition active:scale-95 cursor-pointer text-sm"
            >
              Book a Service in 1 Minute
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
