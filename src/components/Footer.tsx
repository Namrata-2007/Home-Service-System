import React from 'react';
import { 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Database, 
  Code2, 
  Layers,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, setIsPhpSqlModalOpen, setIsFigmaModalOpen } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: About */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Home<span className="text-blue-400">Serve</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
              Your dependable partner for all residential maintenance needs. Book background-verified technicians for plumbing, electrical, cleaning, and repairs in minutes.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>30-Day Workmanship Warranty on all bookings</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Popular Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition cursor-pointer"
                >
                  Plumbing & Leak Repairs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition cursor-pointer"
                >
                  Electrical Diagnosis & Wiring
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition cursor-pointer"
                >
                  Full Deep House Cleaning
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition cursor-pointer"
                >
                  AC Servicing & Gas Refill
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition cursor-pointer"
                >
                  Interior Painting & Waterproofing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition cursor-pointer"
                >
                  Carpentry & Lock Installation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Academic Hub */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Project Architecture
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setIsPhpSqlModalOpen(true)}
                className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 transition cursor-pointer text-xs group"
              >
                <div className="flex items-center gap-2 font-semibold text-white group-hover:text-blue-300">
                  <Database className="w-4 h-4 text-cyan-400" />
                  MySQL Schema & Tables
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Users, Services, Bookings, Administrators SQL</p>
              </button>

              <button
                onClick={() => setIsPhpSqlModalOpen(true)}
                className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 transition cursor-pointer text-xs group"
              >
                <div className="flex items-center gap-2 font-semibold text-white group-hover:text-blue-300">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  PHP Backend Scripts
                </div>
                <p className="text-[11px] text-slate-400 mt-1">db_connect.php, register.php, book.php, admin.php</p>
              </button>

              <button
                onClick={() => setIsFigmaModalOpen(true)}
                className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 transition cursor-pointer text-xs group"
              >
                <div className="flex items-center gap-2 font-semibold text-white group-hover:text-blue-300">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Figma Wireframes & Prototype
                </div>
                <p className="text-[11px] text-slate-400 mt-1">UI/UX design specs, typography & color system</p>
              </button>
            </div>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Contact & Hours
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>742 Evergreen Plaza, Suite 400, Springfield, IL 62704</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+1 (800) 555-HOME (24/7)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@homeserve.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200">Mon - Sun: 7:00 AM - 10:00 PM</p>
                  <p className="text-[11px] text-slate-500">Emergency crew on standby 24/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Academic info */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} HomeServe System. Built with HTML5, CSS3, JavaScript, PHP & MySQL.
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setCurrentPage('contact')} 
              className="hover:text-slate-300 transition cursor-pointer"
            >
              Contact Support
            </button>
            <button 
              onClick={() => setIsPhpSqlModalOpen(true)} 
              className="hover:text-slate-300 transition cursor-pointer"
            >
              Database Architecture
            </button>
            <button 
              onClick={() => setCurrentPage('admin')} 
              className="hover:text-slate-300 transition cursor-pointer"
            >
              Administrator Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
