import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ServiceItem, 
  Booking, 
  User, 
  Technician, 
  ContactInquiry, 
  BookingStatus,
  ServiceCategory 
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_BOOKINGS, 
  INITIAL_USERS, 
  TECHNICIANS 
} from '../data/mockData';

export type PageView = 'home' | 'services' | 'bookings' | 'admin' | 'contact' | 'architecture';

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  services: ServiceItem[];
  bookings: Booking[];
  technicians: Technician[];
  inquiries: ContactInquiry[];
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  // Modals state
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  serviceToBook: ServiceItem | null;
  setServiceToBook: (service: ServiceItem | null) => void;
  
  invoiceBooking: Booking | null;
  setInvoiceBooking: (booking: Booking | null) => void;

  isPhpSqlModalOpen: boolean;
  setIsPhpSqlModalOpen: (open: boolean) => void;

  isFigmaModalOpen: boolean;
  setIsFigmaModalOpen: (open: boolean) => void;

  // Actions
  login: (email: string, role?: 'customer' | 'admin') => boolean;
  registerUser: (name: string, email: string, phone: string, address: string) => boolean;
  logout: () => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  rateBooking: (bookingId: string, rating: number, review: string) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus, technicianId?: number) => void;
  updateServicePrice: (serviceId: number, newPrice: number) => void;
  updateServiceDetails: (updated: ServiceItem) => void;
  addService: (newService: Omit<ServiceItem, 'id'>) => void;
  toggleServiceActive: (serviceId: number) => void;
  submitInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'resolved'>) => void;
  resolveInquiry: (inquiryId: number) => void;
  resetDemoData: () => void;
  startBookingForService: (service: ServiceItem) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'homeserve_services_v4',
  BOOKINGS: 'homeserve_bookings_v4',
  USERS: 'homeserve_users_v4',
  INQUIRIES: 'homeserve_inquiries_v4',
  AUTH: 'homeserve_auth_v4',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  
  // Load users
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      return stored ? JSON.parse(stored) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current active user
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (stored) return JSON.parse(stored);
      // Default to demo customer Aarav Sharma for immediate frictionless browsing
      return INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  // Load services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return stored ? JSON.parse(stored) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  // Load bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Technicians
  const [technicians] = useState<Technician[]>(TECHNICIANS);

  // Inquiries
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return stored ? JSON.parse(stored) : [
        {
          id: 1,
          name: 'Karan Malhotra',
          email: 'karan.m@example.com',
          phone: '+91 98112 23344',
          category: 'Commercial Inquiry',
          message: 'Do you offer monthly AMC maintenance contracts for a 4-floor IT office building in Baner, Pune?',
          createdAt: '2026-10-25',
          resolved: false
        }
      ];
    } catch {
      return [];
    }
  });

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [serviceToBook, setServiceToBook] = useState<ServiceItem | null>(null);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);
  const [isPhpSqlModalOpen, setIsPhpSqlModalOpen] = useState(false);
  const [isFigmaModalOpen, setIsFigmaModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }, [currentUser]);

  // Auth operations
  const login = (email: string, role?: 'customer' | 'admin'): boolean => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      addToast(`Welcome back, ${existing.name}! Logged in as ${existing.role}.`, 'success');
      return true;
    }
    // If logging in with admin@homeserve.in or role specified
    if (email.toLowerCase().includes('admin') || role === 'admin') {
      const adminUser = users.find(u => u.role === 'admin') || INITIAL_USERS[INITIAL_USERS.length - 1];
      setCurrentUser(adminUser);
      addToast(`Administrator access granted (${adminUser.name}).`, 'success');
      return true;
    }

    // Default create dummy if not exists
    const newUser: User = {
      id: Date.now(),
      name: email.split('@')[0],
      email: email,
      phone: '+91 98765 00000',
      role: role || 'customer',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast(`Signed in successfully as ${newUser.name}!`, 'success');
    return true;
  };

  const registerUser = (name: string, email: string, phone: string, address: string): boolean => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      addToast('An account with this email already exists.', 'error');
      return false;
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      phone,
      address,
      city: 'Pune',
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast('Account created successfully! Welcome to HomeServe.', 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('You have been logged out.', 'info');
  };

  // Booking operations
  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const randomId = `HSM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: randomId,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => [newBooking, ...prev]);
    addToast(`Booking ${randomId} confirmed! You can track its status in My Bookings.`, 'success');
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b)
    );
    addToast(`Booking ${bookingId} has been cancelled.`, 'info');
  };

  const rateBooking = (bookingId: string, rating: number, review: string) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, userRating: rating, userReview: review } : b)
    );
    addToast('Thank you for your rating and feedback!', 'success');
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus, technicianId?: number) => {
    setBookings(prev => 
      prev.map(b => {
        if (b.id !== bookingId) return b;
        const assignedTech = technicianId 
          ? technicians.find(t => t.id === technicianId) 
          : b.technician;
        return {
          ...b,
          status,
          technician: assignedTech
        };
      })
    );
    addToast(`Updated booking ${bookingId} to ${status}.`, 'success');
  };

  // Service management operations
  const updateServicePrice = (serviceId: number, newPrice: number) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, basePrice: newPrice } : s)
    );
    addToast(`Service price updated to ₹${newPrice}.`, 'success');
  };

  const updateServiceDetails = (updated: ServiceItem) => {
    setServices(prev => 
      prev.map(s => s.id === updated.id ? updated : s)
    );
    addToast(`Service "${updated.name}" updated successfully.`, 'success');
  };

  const addService = (newService: Omit<ServiceItem, 'id'>) => {
    const id = Date.now();
    const service: ServiceItem = {
      ...newService,
      id,
    };
    setServices(prev => [...prev, service]);
    addToast(`New service "${service.name}" added to catalogue.`, 'success');
  };

  const toggleServiceActive = (serviceId: number) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, isActive: !s.isActive } : s)
    );
  };

  // Contact inquiry operations
  const submitInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'resolved'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      resolved: false
    };
    setInquiries(prev => [newInquiry, ...prev]);
    addToast('Thank you! Your message has been sent to our support desk.', 'success');
  };

  const resolveInquiry = (inquiryId: number) => {
    setInquiries(prev => 
      prev.map(item => item.id === inquiryId ? { ...item, resolved: true } : item)
    );
    addToast('Inquiry marked as resolved.', 'info');
  };

  const resetDemoData = () => {
    setServices(INITIAL_SERVICES);
    setBookings(INITIAL_BOOKINGS);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    localStorage.clear();
    addToast('Demo database successfully reset to clean defaults.', 'info');
  };

  const startBookingForService = (service: ServiceItem) => {
    setServiceToBook(service);
    setIsBookingModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentUser,
        setCurrentUser,
        users,
        services,
        bookings,
        technicians,
        inquiries,
        toasts,
        addToast,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isBookingModalOpen,
        setIsBookingModalOpen,
        serviceToBook,
        setServiceToBook,
        invoiceBooking,
        setInvoiceBooking,
        isPhpSqlModalOpen,
        setIsPhpSqlModalOpen,
        isFigmaModalOpen,
        setIsFigmaModalOpen,
        login,
        registerUser,
        logout,
        createBooking,
        cancelBooking,
        rateBooking,
        updateBookingStatus,
        updateServicePrice,
        updateServiceDetails,
        addService,
        toggleServiceActive,
        submitInquiry,
        resolveInquiry,
        resetDemoData,
        startBookingForService
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
