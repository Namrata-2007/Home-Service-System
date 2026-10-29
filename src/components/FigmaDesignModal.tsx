import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Layout, 
  Palette, 
  Type, 
  GitBranch, 
  Smartphone, 
  Monitor, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FigmaDesignModal: React.FC = () => {
  const { isFigmaModalOpen, setIsFigmaModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'wireframes' | 'colors' | 'flow' | 'components'>('wireframes');
  const [activeWireframe, setActiveWireframe] = useState<'home' | 'services' | 'booking' | 'admin'>('home');

  if (!isFigmaModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-auto overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-blue-800 text-white p-5 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Layers className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Figma UI/UX Design System & Prototypes</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-900 px-2 py-0.5 rounded-sm">
                  Design Specs
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Wireframes, typography hierarchy, color tokens, and interactive flow for academic review
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsFigmaModalOpen(false)}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold px-4">
          <button
            onClick={() => setActiveTab('wireframes')}
            className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition cursor-pointer ${
              activeTab === 'wireframes'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layout className="w-4 h-4 text-blue-600" />
            <span>Interactive Wireframe Blueprints</span>
          </button>

          <button
            onClick={() => setActiveTab('colors')}
            className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition cursor-pointer ${
              activeTab === 'colors'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-4 h-4 text-indigo-600" />
            <span>Color Tokens (Blue & White)</span>
          </button>

          <button
            onClick={() => setActiveTab('flow')}
            className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition cursor-pointer ${
              activeTab === 'flow'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4 text-emerald-600" />
            <span>User Journey Flows</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition cursor-pointer ${
              activeTab === 'components'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-4 h-4 text-amber-600" />
            <span>Design Tokens & Typography</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: Wireframes */}
          {activeTab === 'wireframes' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Screen Wireframe:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveWireframe('home')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeWireframe === 'home' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    Home Landing
                  </button>
                  <button
                    onClick={() => setActiveWireframe('services')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeWireframe === 'services' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    Services Catalog
                  </button>
                  <button
                    onClick={() => setActiveWireframe('booking')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeWireframe === 'booking' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    Booking Flow
                  </button>
                  <button
                    onClick={() => setActiveWireframe('admin')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeWireframe === 'admin' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    Admin Dashboard
                  </button>
                </div>
              </div>

              {/* Wireframe Mockup Canvas */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white font-mono text-xs">
                {activeWireframe === 'home' && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div className="border border-slate-700 rounded-lg p-2.5 flex justify-between items-center bg-slate-800">
                      <span className="font-bold text-blue-400">[Logo: HomeServe]</span>
                      <span className="text-slate-400">[Nav: Home | Services | Bookings | Admin | Contact]</span>
                      <span className="bg-blue-600 px-2 py-0.5 rounded text-[11px]">[CTA: Book Now]</span>
                    </div>

                    <div className="border-2 border-dashed border-blue-500/50 rounded-xl p-6 text-center space-y-2 bg-blue-950/20">
                      <h4 className="text-base font-bold text-white">HERO: "Reliable & Trusted Home Services at Your Doorstep"</h4>
                      <p className="text-slate-400 text-[11px]">Sub-copy + Trust badges (15k+ Homes, 4.9 Stars, Verified Pros)</p>
                      <div className="flex justify-center gap-2 pt-2">
                        <span className="bg-blue-600 px-3 py-1 rounded text-white">[Book a Service]</span>
                        <span className="border border-slate-600 px-3 py-1 rounded text-slate-300">[Explore Services]</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="border border-slate-700 p-3 rounded bg-slate-800/80 text-center">
                        <p className="text-blue-300 font-bold">Plumbing</p>
                        <p className="text-[10px] text-slate-400">Leak repairs, drains</p>
                      </div>
                      <div className="border border-slate-700 p-3 rounded bg-slate-800/80 text-center">
                        <p className="text-blue-300 font-bold">Electrical</p>
                        <p className="text-[10px] text-slate-400">Circuits, fans, lights</p>
                      </div>
                      <div className="border border-slate-700 p-3 rounded bg-slate-800/80 text-center">
                        <p className="text-blue-300 font-bold">Cleaning</p>
                        <p className="text-[10px] text-slate-400">Deep home sanitation</p>
                      </div>
                    </div>

                    <div className="border border-slate-700 p-3 rounded bg-slate-800 text-center text-slate-400">
                      [How It Works: 1. Choose → 2. Pick Slot → 3. Expert Arrives → 4. Pay after Service]
                    </div>
                  </div>
                )}

                {activeWireframe === 'services' && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div className="flex gap-2 justify-center border-b border-slate-800 pb-3">
                      <span className="bg-blue-600 px-2.5 py-1 rounded">[All Categories]</span>
                      <span className="bg-slate-800 px-2.5 py-1 rounded">[Plumbing]</span>
                      <span className="bg-slate-800 px-2.5 py-1 rounded">[Electrical]</span>
                      <span className="bg-slate-800 px-2.5 py-1 rounded">[Appliance]</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border border-slate-700 p-3 rounded-lg bg-slate-800 space-y-1.5">
                        <div className="h-20 bg-slate-700 rounded flex items-center justify-center text-slate-400">[Service Image]</div>
                        <p className="font-bold text-white">Pipe Leakage & Tap Fix</p>
                        <p className="text-[10px] text-emerald-400">Price: ₹299.00 | ~1.5 hrs</p>
                        <div className="bg-blue-600 text-center py-1 rounded text-white">[Book Now]</div>
                      </div>
                      <div className="border border-slate-700 p-3 rounded-lg bg-slate-800 space-y-1.5">
                        <div className="h-20 bg-slate-700 rounded flex items-center justify-center text-slate-400">[Service Image]</div>
                        <p className="font-bold text-white">Circuit & Short Repair</p>
                        <p className="text-[10px] text-emerald-400">Price: ₹349.00 | ~1.5 hrs</p>
                        <div className="bg-blue-600 text-center py-1 rounded text-white">[Book Now]</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeWireframe === 'booking' && (
                  <div className="space-y-3 max-w-md mx-auto border border-blue-500/40 p-4 rounded-xl bg-slate-800">
                    <p className="font-bold text-blue-400 border-b border-slate-700 pb-1.5">[Modal: Book a Service]</p>
                    <div className="space-y-2 text-[11px]">
                      <div className="p-2 bg-slate-900 rounded">1. Service dropdown: [Select category & task]</div>
                      <div className="p-2 bg-slate-900 rounded">2. Date picker + Time slot (Morning / Afternoon / Evening)</div>
                      <div className="p-2 bg-slate-900 rounded">3. Customer Name, Phone, Email, Full Street Address</div>
                      <div className="p-2 bg-slate-900 rounded">4. Payment: [Cash on Delivery] | [Card] | [UPI]</div>
                      <div className="p-2 bg-blue-900/40 border border-blue-600 rounded text-center font-bold text-white">
                        [CTA: Confirm & Schedule Booking]
                      </div>
                    </div>
                  </div>
                )}

                {activeWireframe === 'admin' && (
                  <div className="space-y-3 max-w-xl mx-auto">
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      <div className="bg-slate-800 p-2 rounded border border-slate-700">Total: 48 Bookings</div>
                      <div className="bg-slate-800 p-2 rounded border border-slate-700">Revenue: ₹28,400</div>
                      <div className="bg-slate-800 p-2 rounded border border-slate-700">Pending: 3</div>
                      <div className="bg-slate-800 p-2 rounded border border-slate-700">Techs: 5 Active</div>
                    </div>
                    <div className="border border-slate-700 p-3 rounded bg-slate-800">
                      <p className="font-bold text-white mb-2">Bookings Management Table</p>
                      <div className="text-[10px] text-slate-400 border-t border-slate-700 pt-1 flex justify-between">
                        <span>#HSM-4019</span>
                        <span>Aarav Sharma</span>
                        <span>Plumbing</span>
                        <span className="text-amber-400">[Status: Assigned]</span>
                        <span className="text-blue-400">[Actions: Reassign / Status]</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Colors */}
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Figma Color Palette (Clean Blue & White Theme)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <div className="h-20 bg-blue-600"></div>
                  <div className="p-3 text-xs">
                    <p className="font-bold text-slate-900">Primary Brand Blue</p>
                    <p className="font-mono text-slate-500">#2563EB / Tailwind blue-600</p>
                    <p className="text-[11px] text-slate-400 mt-1">Used for CTAs, hero badges, links</p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <div className="h-20 bg-blue-900"></div>
                  <div className="p-3 text-xs">
                    <p className="font-bold text-slate-900">Deep Navy Blue</p>
                    <p className="font-mono text-slate-500">#1E3A8A / Tailwind blue-900</p>
                    <p className="text-[11px] text-slate-400 mt-1">Header strip, high-contrast headings</p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <div className="h-20 bg-blue-50 border-b border-slate-200"></div>
                  <div className="p-3 text-xs">
                    <p className="font-bold text-slate-900">Ice Blue Surface</p>
                    <p className="font-mono text-slate-500">#EFF6FF / Tailwind blue-50</p>
                    <p className="text-[11px] text-slate-400 mt-1">Card backgrounds, active nav tabs</p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <div className="h-20 bg-white border-b border-slate-200"></div>
                  <div className="p-3 text-xs">
                    <p className="font-bold text-slate-900">Pure White Background</p>
                    <p className="font-mono text-slate-500">#FFFFFF</p>
                    <p className="text-[11px] text-slate-400 mt-1">Main layout canvases, modal cards</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: User Journey Flow */}
          {activeTab === 'flow' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Customer Booking Journey</h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg">1. Landing Page</span>
                  <span>➔</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg">2. Browse Services</span>
                  <span>➔</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg">3. Select Date & Slot</span>
                  <span>➔</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg">4. Enter Address</span>
                  <span>➔</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg">5. Pay / Confirm</span>
                  <span>➔</span>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg">6. Track Status</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Administrator Workflow</h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-lg">1. Admin Auth</span>
                  <span>➔</span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-lg">2. Review Bookings</span>
                  <span>➔</span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-lg">3. Assign Technician</span>
                  <span>➔</span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-lg">4. Update Status</span>
                  <span>➔</span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-lg">5. Calibrate Prices</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Design Tokens */}
          {activeTab === 'components' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
                  <h4 className="font-bold text-slate-900 mb-2">Typography Hierarchy</h4>
                  <ul className="space-y-2">
                    <li><strong className="text-slate-900">Font Family:</strong> Inter, system-ui, -apple-system, sans-serif</li>
                    <li><strong className="text-slate-900">Display Heading 1:</strong> 36px / 44px (Hero Title, Bold 800)</li>
                    <li><strong className="text-slate-900">Section Heading 2:</strong> 24px / 32px (Service Grids, Bold 700)</li>
                    <li><strong className="text-slate-900">Card Titles:</strong> 16px / 24px (Semi-bold 600)</li>
                    <li><strong className="text-slate-900">Body Text:</strong> 14px / 20px (Regular 400 & Medium 500)</li>
                    <li><strong className="text-slate-900">Micro Badges:</strong> 11px / 16px (Uppercase Bold 700)</li>
                  </ul>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
                  <h4 className="font-bold text-slate-900 mb-2">UI Component System</h4>
                  <ul className="space-y-2">
                    <li><strong className="text-slate-900">Corner Radius:</strong> <code>rounded-xl</code> (12px) for cards, <code>rounded-2xl</code> (16px) for modals</li>
                    <li><strong className="text-slate-900">Elevation:</strong> Light shadow-sm on idle, shadow-md & translateY(-2px) on hover</li>
                    <li><strong className="text-slate-900">Buttons:</strong> High-contrast blue primary, neutral border secondary</li>
                    <li><strong className="text-slate-900">Accessibility:</strong> WCAG AA 4.5:1 color contrast ratio achieved throughout</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
