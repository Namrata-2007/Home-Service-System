/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { BookingModal } from './components/BookingModal';
import { InvoiceModal } from './components/InvoiceModal';
import { ProjectArchitectureModal } from './components/ProjectArchitectureModal';
import { FigmaDesignModal } from './components/FigmaDesignModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ContactPage } from './pages/ContactPage';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`p-3.5 rounded-xl shadow-xl border text-xs font-medium flex items-center gap-2.5 pointer-events-auto animate-in slide-in-from-bottom-2 fade-in duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-900/95 text-white border-emerald-700 shadow-emerald-900/20'
              : toast.type === 'error'
              ? 'bg-rose-900/95 text-white border-rose-700 shadow-rose-900/20'
              : 'bg-slate-900/95 text-white border-slate-700 shadow-slate-900/20'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
          <span className="flex-1 leading-snug">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <main className="flex-1">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'bookings' && <MyBookingsPage />}
      {currentPage === 'admin' && <AdminDashboard />}
      {currentPage === 'contact' && <ContactPage />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Modals */}
        <AuthModal />
        <BookingModal />
        <InvoiceModal />
        <ProjectArchitectureModal />
        <FigmaDesignModal />

        {/* Toast notifications */}
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
