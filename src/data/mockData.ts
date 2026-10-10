import { ServiceItem, Technician, Booking, User } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 1,
    name: 'Pipe Leakage & Tap Repair',
    category: 'Plumbing',
    shortDesc: 'Instant fix for water leaks, faucet drips, and pipe joints.',
    fullDesc: 'Comprehensive plumbing inspection and repair for bathroom, kitchen, or underground water lines. Includes replacement of worn-out washers, thread sealing, and pressure checking.',
    basePrice: 39,
    durationHours: 1.5,
    rating: 4.9,
    reviewCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Diagnostic leak source identification',
      'Washer & connector tightening/replacement',
      'High-pressure test to ensure zero residual drip',
      'Up to 2 tap fixtures repaired per session'
    ],
    popular: true,
    isActive: true,
  },
  {
    id: 2,
    name: 'Drain Unblocking & Pipe Descaling',
    category: 'Plumbing',
    shortDesc: 'Heavy-duty motorized snake cleaning for clogged sinks and floor drains.',
    fullDesc: 'Rapid clog clearing for kitchen sinks, shower traps, bathtubs, and main lateral sewer lines. Uses specialized mechanical augers and non-corrosive chemical flushing.',
    basePrice: 49,
    durationHours: 2.0,
    rating: 4.8,
    reviewCount: 98,
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Mechanical snake line clearing up to 25ft',
      'Debris removal and eco-friendly pipe flush',
      'Flow-rate velocity testing',
      'Free 15-day anti-clog warranty'
    ],
    popular: false,
    isActive: true,
  },
  {
    id: 3,
    name: 'Electrical Circuit & Short-Fix',
    category: 'Electrical',
    shortDesc: 'Trip detection, MCB fuse replacement, and spark diagnosis.',
    fullDesc: 'Certified electrician service to diagnose tripping breakers, short circuits, switchboard burnouts, and erratic voltage fluctuations. Fast emergency diagnosis with safety insulation tests.',
    basePrice: 45,
    durationHours: 1.5,
    rating: 4.9,
    reviewCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Digital multimeter voltage & ground testing',
      'MCB switchboard health audit',
      'Rewiring / insulation of exposed points',
      'Certified electrical safety certificate'
    ],
    popular: true,
    isActive: true,
  },
  {
    id: 4,
    name: 'Ceiling Fan & Light Fixture Setup',
    category: 'Electrical',
    shortDesc: 'Mounting chandeliers, ceiling fans, smart LED panels, and sockets.',
    fullDesc: 'Professional anchoring, height alignment, and cabling for fans, hanging chandeliers, recessed spotlights, and heavy fixtures. Includes concealed wire tucking.',
    basePrice: 35,
    durationHours: 1.0,
    rating: 4.7,
    reviewCount: 84,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Structural ceiling anchor load test',
      'Fan balancing & zero-wobble calibration',
      'Switch & speed regulator connection',
      'Up to 3 basic lights or 1 fan per booking'
    ],
    popular: false,
    isActive: true,
  },
  {
    id: 5,
    name: 'Full Deep Home Cleaning',
    category: 'House Cleaning',
    shortDesc: 'Deep sanitation of living room, bedrooms, kitchen, and balconies.',
    fullDesc: 'Top-to-bottom industrial vacuuming, scrubbing, and sanitizing. Removes stubborn dirt behind heavy appliances, ceiling corners, window tracks, and skirting boards with hospital-grade disinfectant.',
    basePrice: 89,
    durationHours: 4.0,
    rating: 5.0,
    reviewCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Heavy-duty floor buffing & chemical vacuuming',
      'Kitchen degreasing (chimney exterior & cooktop)',
      'Balcony washing & glass window track degunking',
      'Dust mite anti-allergen fogging'
    ],
    popular: true,
    isActive: true,
  },
  {
    id: 6,
    name: 'Kitchen & Bathroom Sanitization',
    category: 'House Cleaning',
    shortDesc: 'Targeted tile descaling, grout whitening, and sink polishing.',
    fullDesc: 'Intense chemical scrub for tough water stains, moldy grout, lime-scale on fixtures, and oil grease on countertops. Restores shine and kills 99.9% of bacteria.',
    basePrice: 55,
    durationHours: 2.5,
    rating: 4.8,
    reviewCount: 167,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Tile grout acid-free steam wash',
      'Toilet bowl and shower glass descaling',
      'Chrome tap mirror finish buffing',
      'Exhaust fan and filter degreasing'
    ],
    popular: false,
    isActive: true,
  },
  {
    id: 7,
    name: 'AC Servicing & Gas Refill',
    category: 'Appliance Repair',
    shortDesc: 'Filter jet-spray wash, cooling coil inspection, and refrigerant recharge.',
    fullDesc: 'Complete indoor and outdoor air conditioner servicing. Eliminates musty odors, restores ice-cold airflow, checks cooling gas pressure (R32 / R410), and unclogs water drainage pipes.',
    basePrice: 49,
    durationHours: 1.5,
    rating: 4.9,
    reviewCount: 280,
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'High-pressure pump cleaning of indoor coil & tray',
      'Outdoor condenser fins wash & dust clearing',
      'Refrigerant level check & leak probe',
      'Amperage and compressor load diagnostic'
    ],
    popular: true,
    isActive: true,
  },
  {
    id: 8,
    name: 'Refrigerator & Freezer Repair',
    category: 'Appliance Repair',
    shortDesc: 'No cooling fix, frost buildup removal, and thermostat troubleshooting.',
    fullDesc: 'Expert repair for single-door, double-door, and side-by-side refrigerators. Resolves loud buzzing noises, leaking water trays, sensor faults, and compressor relays.',
    basePrice: 42,
    durationHours: 1.5,
    rating: 4.8,
    reviewCount: 122,
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Defrost timer & thermostat evaluation',
      'Compressor relay & capacitor testing',
      'Door gasket seal magnetic test',
      'Genuine spare parts consultation'
    ],
    popular: false,
    isActive: true,
  },
  {
    id: 9,
    name: 'Interior Wall Painting & Touch-up',
    category: 'Painting',
    shortDesc: 'Premium acrylic emulsions, crack filling, and color touch-ups.',
    fullDesc: 'Transform dull or stained rooms with fresh coats of washable, low-VOC paint. Includes putty patching for nail holes and cracks, masking tape perimeter protection, and clean cleanup.',
    basePrice: 99,
    durationHours: 6.0,
    rating: 4.9,
    reviewCount: 175,
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Wall inspection and moisture reading',
      'Putty putty crack filing and smooth sanding',
      'Double coat premium emulsion application',
      'Furniture wrapping & floor drop cloth protection'
    ],
    popular: true,
    isActive: true,
  },
  {
    id: 10,
    name: 'Furniture Carpentry & Door Lock Fix',
    category: 'Carpentry',
    shortDesc: 'Hinge realignment, sliding door repair, and lock cylinder replacement.',
    fullDesc: 'Precision woodworking and hardware repairs. We fix squeaky cabinet hinges, sticky wooden doors, broken drawer sliders, and install high-security deadbolts.',
    basePrice: 39,
    durationHours: 1.5,
    rating: 4.7,
    reviewCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Door planing & hinge tension adjustment',
      'Mortise lock / latch installation & testing',
      'Wooden shelf leveling and wall anchoring',
      'Smooth lubrication of moving hardware'
    ],
    popular: false,
    isActive: true,
  }
];

export const TECHNICIANS: Technician[] = [
  {
    id: 101,
    name: 'David Miller',
    phone: '+1 (555) 234-5678',
    specialty: 'Plumbing',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 102,
    name: 'Marcus Vance',
    phone: '+1 (555) 345-6789',
    specialty: 'Electrical',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 103,
    name: 'Elena Rostova',
    phone: '+1 (555) 456-7890',
    specialty: 'House Cleaning',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 104,
    name: 'Carlos Mendez',
    phone: '+1 (555) 567-8901',
    specialty: 'Appliance Repair',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 105,
    name: 'Samuel Hayes',
    phone: '+1 (555) 678-9012',
    specialty: 'Painting',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 789-0123',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'Springfield',
    role: 'customer',
    createdAt: '2026-09-15'
  },
  {
    id: 2,
    name: 'Sarah Connor',
    email: 'sarah.c@example.com',
    phone: '+1 (555) 890-1234',
    address: '104 Ocean View Drive',
    city: 'Springfield',
    role: 'customer',
    createdAt: '2026-09-22'
  },
  {
    id: 99,
    name: 'Admin Supervisor',
    email: 'admin@homeserve.com',
    phone: '+1 (555) 100-2000',
    address: 'HomeServe Operations HQ',
    city: 'Springfield',
    role: 'admin',
    createdAt: '2026-01-01'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'HSM-4019',
    userId: 1,
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    userPhone: '+1 (555) 789-0123',
    serviceId: 1,
    serviceName: 'Pipe Leakage & Tap Repair',
    serviceCategory: 'Plumbing',
    servicePrice: 39,
    serviceDuration: 1.5,
    bookingDate: '2026-10-12',
    timeSlot: '09:00 AM - 12:00 PM',
    address: {
      street: '742 Evergreen Terrace',
      apartment: 'Apt 4B',
      city: 'Springfield',
      zipCode: '62704',
      notes: 'Ring bell twice; pipe under master sink is dripping into basin.'
    },
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Technician Assigned',
    technician: TECHNICIANS[0],
    createdAt: '2026-10-08T14:20:00Z',
    totalAmount: 39
  },
  {
    id: 'HSM-3820',
    userId: 1,
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    userPhone: '+1 (555) 789-0123',
    serviceId: 5,
    serviceName: 'Full Deep Home Cleaning',
    serviceCategory: 'House Cleaning',
    servicePrice: 89,
    serviceDuration: 4.0,
    bookingDate: '2026-09-28',
    timeSlot: '01:00 PM - 05:00 PM',
    address: {
      street: '742 Evergreen Terrace',
      apartment: 'Apt 4B',
      city: 'Springfield',
      zipCode: '62704',
      notes: 'Focus on kitchen grease and bathroom tiles.'
    },
    paymentMethod: 'UPI / Card',
    paymentStatus: 'Paid',
    status: 'Completed',
    technician: TECHNICIANS[2],
    createdAt: '2026-09-24T10:15:00Z',
    discountApplied: 10,
    totalAmount: 79,
    userRating: 5,
    userReview: 'Elena and team did an outstanding job! The floor and kitchen tiles look brand new. Will definitely book again.'
  },
  {
    id: 'HSM-4152',
    userId: 2,
    userName: 'Sarah Connor',
    userEmail: 'sarah.c@example.com',
    userPhone: '+1 (555) 890-1234',
    serviceId: 7,
    serviceName: 'AC Servicing & Gas Refill',
    serviceCategory: 'Appliance Repair',
    servicePrice: 49,
    serviceDuration: 1.5,
    bookingDate: '2026-10-14',
    timeSlot: '02:00 PM - 05:00 PM',
    address: {
      street: '104 Ocean View Drive',
      city: 'Springfield',
      zipCode: '62702',
      notes: 'Split AC in living room not blowing cold air.'
    },
    paymentMethod: 'Online (Simulated)',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    createdAt: '2026-10-09T18:00:00Z',
    totalAmount: 49
  }
];
