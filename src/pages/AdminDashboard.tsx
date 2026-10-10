import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Plus, 
  Save, 
  Trash2, 
  Eye, 
  Filter, 
  Search, 
  RefreshCw,
  Phone,
  MessageSquare,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookingStatus, ServiceCategory, ServiceItem, User } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    users, 
    services, 
    bookings, 
    technicians, 
    inquiries,
    updateBookingStatus, 
    updateServicePrice, 
    updateServiceDetails,
    addService,
    toggleServiceActive,
    resolveInquiry,
    setInvoiceBooking,
    resetDemoData,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'customers' | 'inquiries'>('bookings');
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('All');
  const [bookingSearch, setBookingSearch] = useState('');

  // Editing service state
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  // New Service Form State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState<ServiceCategory>('Plumbing');
  const [newServicePrice, setNewServicePrice] = useState<number>(45);
  const [newServiceDuration, setNewServiceDuration] = useState<number>(1.5);
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceImg, setNewServiceImg] = useState('https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80');

  // Check if current user is admin
  const isAdmin = currentUser && currentUser.role === 'admin';

  // Statistics
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings
    .filter(b => b.status === 'Completed' || b.paymentStatus === 'Paid')
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const pendingApprovals = bookings.filter(b => b.status === 'Pending').length;
  const activeCustomersCount = users.filter(u => u.role === 'customer').length;

  const handleAdminGateLogin = () => {
    const adminAccount = users.find(u => u.role === 'admin') || {
      id: 99,
      name: 'System Admin',
      email: 'admin@homeserve.com',
      phone: '+1 (555) 100-2000',
      role: 'admin',
      createdAt: '2026-01-01'
    };
    setCurrentUser(adminAccount);
    addToast('Logged in as System Administrator.', 'success');
  };

  const handleStartEditPrice = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setTempPrice(service.basePrice);
  };

  const handleSavePrice = (serviceId: number) => {
    if (tempPrice <= 0) {
      addToast('Price must be greater than 0', 'error');
      return;
    }
    updateServicePrice(serviceId, tempPrice);
    setEditingServiceId(null);
  };

  const handleCreateNewService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim() || newServicePrice <= 0) {
      addToast('Please enter a valid service name and price.', 'error');
      return;
    }

    addService({
      name: newServiceName.trim(),
      category: newServiceCategory,
      shortDesc: newServiceDesc.trim() || 'Professional residential repair service.',
      fullDesc: newServiceDesc.trim() || 'Complete diagnosis and repair with genuine parts and 30-day warranty.',
      basePrice: newServicePrice,
      durationHours: newServiceDuration,
      rating: 5.0,
      reviewCount: 1,
      imageUrl: newServiceImg,
      inclusions: [
        'Standard doorstep inspection',
        'Certified technician visit',
        '30-day workmanship assurance'
      ],
      isActive: true,
      popular: false
    });

    setIsAddServiceModalOpen(false);
    setNewServiceName('');
    setNewServiceDesc('');
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesFilter = bookingFilterStatus === 'All' || b.status === bookingFilterStatus;
    const matchesSearch = b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.userName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.serviceName.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-slate-200 space-y-5">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Administrator Access</h2>
            <p className="text-xs text-slate-500 mt-1">
              This restricted area requires supervisor privileges to manage bookings, service pricing, and customer accounts.
            </p>
          </div>

          <div className="bg-indigo-50/70 border border-indigo-200/60 p-4 rounded-xl text-left text-xs space-y-1">
            <p className="font-bold text-indigo-900">Academic Demo Credentials:</p>
            <p className="text-indigo-800">Email: <code>admin@homeserve.com</code></p>
            <p className="text-indigo-800">Password: <code>admin123</code></p>
          </div>

          <button
            onClick={handleAdminGateLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition cursor-pointer text-sm shadow-sm"
          >
            Enter Admin Dashboard (1-Click)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200">
                Supervisor Portal
              </span>
              <span className="text-xs text-slate-500">Live MySQL Operations</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
              Administrator Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage customer appointments, dispatch technicians, and adjust service rates
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetDemoData}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition cursor-pointer"
              title="Reset records to default demo dataset"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Bookings</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalBookingsCount}</h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">All customer orders</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Revenue</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1 font-mono">${totalRevenue.toFixed(2)}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Fulfilled bookings</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Orders</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{pendingApprovals}</h3>
              <p className="text-[11px] text-amber-700 mt-0.5">Requires confirmation</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Users</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{activeCustomersCount}</h3>
              <p className="text-[11px] text-blue-600 mt-0.5">{technicians.length} Field Technicians</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 space-x-2 text-xs font-bold bg-white p-2 rounded-2xl border">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-2 px-4 rounded-xl transition cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            📋 Bookings Manager ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`py-2 px-4 rounded-xl transition cursor-pointer ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🛠️ Services & Pricing ({services.length})
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`py-2 px-4 rounded-xl transition cursor-pointer ${
              activeTab === 'customers'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            👥 Registered Customers ({users.filter(u => u.role === 'customer').length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-2 px-4 rounded-xl transition cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            💬 Contact Inquiries ({inquiries.length})
          </button>
        </div>

        {/* TAB 1: BOOKINGS MANAGER */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
            {/* Filter and Search controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by ID, customer, service..."
                  value={bookingSearch}
                  onChange={e => setBookingSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-slate-500 font-semibold">Status:</span>
                <select
                  value={bookingFilterStatus}
                  onChange={e => setBookingFilterStatus(e.target.value)}
                  className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Technician Assigned">Technician Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Booking ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Service & Category</th>
                    <th className="py-3 px-3">Date & Slot</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Assign Technician</th>
                    <th className="py-3 px-3">Update Status</th>
                    <th className="py-3 px-3 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 font-mono font-bold text-blue-700">
                        {b.id}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-slate-900">{b.userName}</p>
                        <p className="text-[11px] text-slate-400">{b.userPhone}</p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-medium text-slate-800">{b.serviceName}</p>
                        <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          {b.serviceCategory}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-medium text-slate-800">{b.bookingDate}</p>
                        <p className="text-[11px] text-slate-500">{b.timeSlot}</p>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        ${b.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={b.technician ? b.technician.id : ''}
                          onChange={e => {
                            const techId = Number(e.target.value);
                            updateBookingStatus(
                              b.id, 
                              b.status === 'Pending' ? 'Technician Assigned' : b.status, 
                              techId
                            );
                          }}
                          className="text-xs border border-slate-200 rounded-lg p-1.5 bg-white focus:outline-hidden"
                        >
                          <option value="">-- Assign Staff --</option>
                          {technicians.map(t => (
                            <option key={t.id} value={t.id}>
                              {t.name} ({t.specialty})
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={b.status}
                          onChange={e => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                          className={`text-xs font-semibold border rounded-lg p-1.5 focus:outline-hidden ${
                            b.status === 'Completed' ? 'border-emerald-300 text-emerald-800 bg-emerald-50' :
                            b.status === 'Cancelled' ? 'border-red-300 text-red-800 bg-red-50' :
                            b.status === 'In Progress' ? 'border-purple-300 text-purple-800 bg-purple-50' :
                            'border-blue-300 text-blue-800 bg-blue-50'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Technician Assigned">Technician Assigned</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setInvoiceBooking(b)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          title="View Invoice Receipt"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES & PRICING MANAGER */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Service Catalog & Price Editor</h3>
                <p className="text-xs text-slate-500">Edit base prices in real time or add new services to the catalog</p>
              </div>

              <button
                onClick={() => setIsAddServiceModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Service Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Est. Duration</th>
                    <th className="py-3 px-3">Base Price ($)</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map(s => {
                    const isEditing = editingServiceId === s.id;

                    return (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3">
                          <p className="font-semibold text-slate-900">{s.name}</p>
                          <p className="text-[11px] text-slate-500 max-w-sm truncate">{s.shortDesc}</p>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-slate-700">{s.category}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          ~{s.durationHours} hrs
                        </td>
                        <td className="py-3 px-3">
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <span>$</span>
                              <input
                                type="number"
                                min="1"
                                step="1"
                                value={tempPrice}
                                onChange={e => setTempPrice(Number(e.target.value))}
                                className="w-20 p-1 border border-blue-500 rounded font-mono font-bold text-xs"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <span className="font-mono font-bold text-slate-900 text-sm">
                              ${s.basePrice.toFixed(2)}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => toggleServiceActive(s.id)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                              s.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {s.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleSavePrice(s.id)}
                                className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold cursor-pointer"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingServiceId(null)}
                                className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px] cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartEditPrice(s)}
                              className="px-2.5 py-1 text-blue-600 hover:bg-blue-50 rounded text-xs font-semibold cursor-pointer"
                            >
                              Edit Price
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMERS MANAGEMENT */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Registered Customer Accounts</h3>
              <p className="text-xs text-slate-500">Stored in MySQL <code>users</code> table</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-3">User ID</th>
                    <th className="py-3 px-3">Name</th>
                    <th className="py-3 px-3">Email Address</th>
                    <th className="py-3 px-3">Phone</th>
                    <th className="py-3 px-3">Default Address</th>
                    <th className="py-3 px-3 text-center">Total Bookings</th>
                    <th className="py-3 px-3">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.filter(u => u.role === 'customer').map(user => {
                    const count = bookings.filter(b => b.userId === user.id || b.userEmail === user.email).length;

                    return (
                      <tr key={user.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3 font-mono font-semibold text-slate-500">#{user.id}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{user.name}</td>
                        <td className="py-3 px-3 text-slate-600">{user.email}</td>
                        <td className="py-3 px-3 text-slate-600">{user.phone}</td>
                        <td className="py-3 px-3 text-slate-600 max-w-xs truncate">{user.address || '—'}</td>
                        <td className="py-3 px-3 text-center">
                          <span className="font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            {count}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500">{user.createdAt}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Contact Us Messages & Inquiries</h3>
              <p className="text-xs text-slate-500">Stored in MySQL <code>inquiries</code> table</p>
            </div>

            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No inquiry messages received yet.</p>
              ) : (
                inquiries.map(inq => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {inq.category}
                        </span>
                        <span className="text-slate-400 text-[10px]">{inq.createdAt}</span>
                      </div>
                      <p className="text-slate-600">
                        Email: <a href={`mailto:${inq.email}`} className="text-blue-600 underline">{inq.email}</a> • Phone: {inq.phone}
                      </p>
                      <p className="text-slate-800 mt-2 bg-white p-2.5 rounded-lg border border-slate-200">
                        "{inq.message}"
                      </p>
                    </div>

                    <div className="shrink-0">
                      {inq.resolved ? (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                        </span>
                      ) : (
                        <button
                          onClick={() => resolveInquiry(inq.id)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs cursor-pointer transition"
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ADD SERVICE MODAL */}
        {isAddServiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add New Home Service</h3>

              <form onSubmit={handleCreateNewService} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Service Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. RO Water Purifier Servicing"
                    value={newServiceName}
                    onChange={e => setNewServiceName(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Category *</label>
                    <select
                      value={newServiceCategory}
                      onChange={e => setNewServiceCategory(e.target.value as ServiceCategory)}
                      className="w-full p-2.5 border border-slate-200 rounded-xl bg-white"
                    >
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="House Cleaning">House Cleaning</option>
                      <option value="Appliance Repair">Appliance Repair</option>
                      <option value="Painting">Painting</option>
                      <option value="Carpentry">Carpentry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Base Price ($) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newServicePrice}
                      onChange={e => setNewServicePrice(Number(e.target.value))}
                      className="w-full p-2.5 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Est. Duration (Hours)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={newServiceDuration}
                    onChange={e => setNewServiceDuration(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what this service involves..."
                    value={newServiceDesc}
                    onChange={e => setNewServiceDesc(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newServiceImg}
                    onChange={e => setNewServiceImg(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddServiceModalOpen(false)}
                    className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
