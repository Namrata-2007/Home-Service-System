export type ServiceCategory = 
  | 'Plumbing'
  | 'Electrical'
  | 'House Cleaning'
  | 'Appliance Repair'
  | 'Painting'
  | 'Carpentry';

export interface ServiceItem {
  id: number;
  name: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  basePrice: number;
  durationHours: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  inclusions: string[];
  popular?: boolean;
  isActive: boolean;
}

export type BookingStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Technician Assigned' 
  | 'In Progress' 
  | 'Completed' 
  | 'Cancelled';

export interface Technician {
  id: number;
  name: string;
  phone: string;
  specialty: ServiceCategory;
  rating: number;
  avatar: string;
}

export interface Booking {
  id: string; // e.g. HSM-1048
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceId: number;
  serviceName: string;
  serviceCategory: ServiceCategory;
  servicePrice: number;
  serviceDuration: number;
  bookingDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 AM - 12:00 PM"
  address: {
    street: string;
    apartment?: string;
    city: string;
    zipCode: string;
    notes?: string;
  };
  paymentMethod: 'Cash on Delivery' | 'Online (Simulated)' | 'UPI / Card';
  paymentStatus: 'Pending' | 'Paid';
  status: BookingStatus;
  technician?: Technician;
  createdAt: string;
  discountApplied?: number;
  totalAmount: number;
  userRating?: number;
  userReview?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  createdAt: string;
  resolved: boolean;
}
