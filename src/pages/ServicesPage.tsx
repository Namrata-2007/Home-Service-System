import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  SlidersHorizontal,
  Calculator,
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCategory, ServiceItem } from '../types';

export const ServicesPage: React.FC = () => {
  const { services, startBookingForService } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  // Quick bundle calculator state
  const [selectedBundleServices, setSelectedBundleServices] = useState<number[]>([]);

  const categories: (ServiceCategory | 'All')[] = [
    'All',
    'Plumbing',
    'Electrical',
    'House Cleaning',
    'Appliance Repair',
    'Painting',
    'Carpentry'
  ];

  // Filtering
  const filtered = services.filter(service => {
    const matchesCat = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.fullDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
    if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const toggleBundleItem = (id: number) => {
    setSelectedBundleServices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const bundleTotal = selectedBundleServices.reduce((sum, id) => {
    const s = services.find(item => item.id === id);
    return sum + (s ? s.basePrice : 0);
  }, 0);
  const bundleDiscount = selectedBundleServices.length >= 2 ? bundleTotal * 0.15 : 0;
  const bundleFinal = bundleTotal - bundleDiscount;

  return (
    <div className="min-h-screen bg-slate-50/60 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Professional Price Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore All Home Services
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Transparent pricing with zero hidden surcharges. All tasks include diagnostic inspection, genuine replacement parts guidance, and our 30-day guarantee.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search plumbing, AC, wiring, painting..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-hidden focus:border-blue-500"
              >
                <option value="default">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-blue-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between"
            >
              {/* Media & Badge */}
              <div className="relative h-52 bg-slate-100">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs font-bold text-slate-900 text-[11px] px-2.5 py-1 rounded-lg shadow-xs">
                  {service.category}
                </span>
                <span className="absolute top-3 right-3 bg-blue-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-lg shadow-xs">
                  ₹{service.basePrice.toFixed(2)}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800">{service.rating.toFixed(1)}</span>
                      <span className="text-slate-400">({service.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>~{service.durationHours} hrs</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>

                {/* Inclusions List */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                  <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                    Included in this service:
                  </p>
                  <ul className="space-y-1">
                    {service.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-slate-600 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA & Bundle check */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedBundleServices.includes(service.id)}
                        onChange={() => toggleBundleItem(service.id)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Add to Bundle Estimator</span>
                    </label>
                  </div>

                  <button
                    onClick={() => startBookingForService(service)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-98"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Service (₹{service.basePrice})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MULTI-SERVICE BUNDLE ESTIMATOR WIDGET */}
        {selectedBundleServices.length > 0 && (
          <div className="sticky bottom-6 z-30 bg-white border border-blue-200 rounded-2xl p-5 shadow-2xl max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Bundle Estimator ({selectedBundleServices.length} services selected)
                  </h4>
                  <p className="text-xs text-slate-500">
                    {selectedBundleServices.length >= 2 
                      ? '🎉 Multi-Service Special: 15% Bundle Discount applied!' 
                      : 'Select 1 more service to unlock 15% multi-task bundle discount.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  {bundleDiscount > 0 && (
                    <span className="text-xs text-slate-400 line-through mr-1 font-mono">₹{bundleTotal.toFixed(2)}</span>
                  )}
                  <span className="text-xl font-bold text-blue-700 font-mono">
                    ₹{bundleFinal.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    const first = services.find(s => s.id === selectedBundleServices[0]);
                    if (first) startBookingForService(first);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Book Bundle Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
