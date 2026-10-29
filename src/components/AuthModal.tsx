import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    login, 
    registerUser,
    setCurrentUser,
    users
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [formError, setFormError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (authMode === 'login') {
      if (!email.trim() || !password.trim()) {
        setFormError('Please enter both email and password.');
        return;
      }
      const success = login(email);
      if (success) {
        setIsAuthModalOpen(false);
        setEmail('');
        setPassword('');
      }
    } else {
      if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !password.trim()) {
        setFormError('Please fill in all required fields.');
        return;
      }
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters.');
        return;
      }
      const success = registerUser(fullName, email, phoneNumber, address);
      if (success) {
        setIsAuthModalOpen(false);
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setAddress('');
      }
    }
  };

  const handleQuickLogin = (type: 'customer' | 'admin') => {
    if (type === 'customer') {
      const demoCust = users.find(u => u.email === 'aarav.sharma@example.com') || users[0];
      if (demoCust) setCurrentUser(demoCust);
    } else {
      const demoAdmin = users.find(u => u.role === 'admin') || users[users.length - 1];
      if (demoAdmin) setCurrentUser(demoAdmin);
    }
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white relative">
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-blue-200" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-200">
              HomeServe Portal
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-sm text-blue-100 mt-1">
            {authMode === 'login' 
              ? 'Sign in to access your bookings and track home services.'
              : 'Register to book plumbing, electrical, and cleaning in seconds.'}
          </p>
        </div>

        {/* Quick Demo Switcher Bar */}
        <div className="bg-blue-50/70 border-b border-blue-100 p-3 px-6">
          <p className="text-xs font-semibold text-blue-900 mb-2">⚡ Quick 1-Click Academic Evaluation Access:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="text-xs font-medium py-1.5 px-2 bg-white hover:bg-blue-100/60 text-blue-800 border border-blue-200 rounded-lg text-center transition cursor-pointer"
            >
              👤 Demo Customer (Aarav)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="text-xs font-medium py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-lg text-center transition cursor-pointer"
            >
              🛡️ Demo Admin (Siddharth)
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-100">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setFormError('');
            }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition cursor-pointer ${
              authMode === 'login'
                ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50/20'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setFormError('');
            }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition cursor-pointer ${
              authMode === 'register'
                ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50/20'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {formError && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {formError}
            </div>
          )}

          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="aarav.sharma@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

          {authMode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Residential Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Flat / Society Name, Area, Pune"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            {authMode === 'login' && (
              <p className="text-[11px] text-slate-400 mt-1">
                Tip: for demo, any test password works (e.g. <code>password123</code> or <code>admin123</code>).
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-98"
          >
            <span>{authMode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
