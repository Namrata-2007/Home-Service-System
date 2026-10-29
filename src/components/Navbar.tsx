import React, { useState } from 'react';
import { 
  Wrench, 
  Phone, 
  Calendar, 
  User as UserIcon, 
  ShieldCheck, 
  Menu, 
  X, 
  LogOut, 
  ChevronDown,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    currentUser, 
    logout, 
    setIsAuthModalOpen, 
    setAuthMode, 
    bookings,
    setIsBookingModalOpen,
    setServiceToBook,
    services
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Active bookings count for current user
  const userActiveBookingsCount = currentUser
    ? bookings.filter(b => b.userId === currentUser.id && b.status !== 'Completed' && b.status !== 'Cancelled').length
    : 0;

  const handleNavClick = (page: typeof currentPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNowClick = () => {
    setServiceToBook(services[0] || null);
    setIsBookingModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs">
      {/* Top Banner: Emergency helpline */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-blue-200">
            <Phone className="w-3.5 h-3.5 text-blue-300" />
            24/7 Home Emergency: <strong className="text-white">1800-209-4663 / +91 98230 45678</strong>
          </span>
          <span className="hidden md:inline-block text-blue-400">|</span>
          <span className="hidden md:flex items-center gap-1 text-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified & Background-Checked Technicians
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-blue-200">
          <span>Serving Pune, Mumbai & Metro Areas</span>
          <span>•</span>
          <span className="text-emerald-300 font-medium">30-Day Work Warranty</span>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition">
                  Home<span className="text-blue-600">Serve</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">
                Home Service Management
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentPage === 'services'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('bookings')}
              className={`relative px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentPage === 'bookings'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4 text-blue-500" />
                My Bookings
              </span>
              {userActiveBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {userActiveBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-indigo-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Admin Portal
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentPage === 'contact'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleBookNowClick}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </button>

            {/* User Dropdown / Auth Buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs border border-blue-200">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left text-xs leading-tight hidden lg:block">
                    <p className="font-semibold text-slate-800 line-clamp-1">{currentUser.name}</p>
                    <p className="text-slate-500 capitalize">{currentUser.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] rounded bg-blue-100 text-blue-800 font-semibold uppercase">
                        {currentUser.role} Account
                      </span>
                    </div>

                    <button
                      onClick={() => handleNavClick('bookings')}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <ClipboardList className="w-4 h-4 text-blue-600" />
                      My Bookings & Invoices
                    </button>

                    {currentUser.role === 'admin' ? (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        Admin Dashboard
                      </button>
                    ) : (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-slate-400" />
                        Switch to Admin View
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="text-xs font-semibold text-slate-700 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg border border-blue-200 transition cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleBookNowClick}
              className="bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'services' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              Services Catalog
            </button>
            <button
              onClick={() => handleNavClick('bookings')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentPage === 'bookings' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              <span>My Bookings</span>
              {userActiveBookingsCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {userActiveBookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
              }`}
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'contact' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-medium px-2 py-1 rounded bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
