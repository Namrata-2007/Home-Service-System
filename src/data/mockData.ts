import { ServiceItem, Technician, Booking, User } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 1,
    name: 'Pipe Leakage & Tap Repair',
    category: 'Plumbing',
    shortDesc: 'Instant fix for water leaks, faucet drips, and pipe joints.',
    fullDesc: 'Comprehensive plumbing inspection and repair for bathroom, kitchen, or underground water lines. Includes replacement of worn-out washers, thread sealing, and pressure checking.',
    basePrice: 299,
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
    basePrice: 499,
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
    basePrice: 349,
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
    basePrice: 249,
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
    basePrice: 1499,
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
    basePrice: 799,
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
    basePrice: 599,
    durationHours: 1.5,
    rating: 4.9,
    reviewCount: 280,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
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
    basePrice: 449,
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
    basePrice: 1999,
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
    basePrice: 349,
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
    name: 'Rajesh Patil',
    phone: '+91 98231 11223',
    specialty: 'Plumbing',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 102,
    name: 'Vikram Deshmukh',
    phone: '+91 98232 22334',
    specialty: 'Electrical',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 103,
    name: 'Priya Nair',
    phone: '+91 98233 33445',
    specialty: 'House Cleaning',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 104,
    name: 'Suresh Kulkarni',
    phone: '+91 98234 44556',
    specialty: 'Appliance Repair',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 105,
    name: 'Amit Verma',
    phone: '+91 98235 55667',
    specialty: 'Painting',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 106,
    name: 'Manoj Shinde',
    phone: '+91 98236 66778',
    specialty: 'Carpentry',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Green Valley Residency, Kothrud',
    city: 'Pune',
    role: 'customer',
    createdAt: '2026-09-15'
  },
  {
    id: 2,
    name: 'Sneha Joshi',
    email: 'sneha.joshi@example.com',
    phone: '+91 97654 32109',
    address: 'B-104, Blue Ridge Township, Hinjewadi Phase 1',
    city: 'Pune',
    role: 'customer',
    createdAt: '2026-09-22'
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 99887 76655',
    address: 'Plot 18, Harmony Park, ITI Road, Aundh',
    city: 'Pune',
    role: 'customer',
    createdAt: '2026-10-02'
  },
  {
    id: 4,
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    phone: '+91 98450 11223',
    address: 'Flat 301, Sea Breeze Apartments, Bandra West',
    city: 'Mumbai',
    role: 'customer',
    createdAt: '2026-10-10'
  },
  {
    id: 99,
    name: 'Siddharth Deshpande',
    email: 'admin@homeserve.in',
    phone: '+91 98230 45678',
    address: '402, Sai Heritage Complex, FC Road, Shivajinagar',
    city: 'Pune',
    role: 'admin',
    createdAt: '2026-01-01'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'HSM-4019',
    userId: 1,
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@example.com',
    userPhone: '+91 98765 43210',
    serviceId: 1,
    serviceName: 'Pipe Leakage & Tap Repair',
    serviceCategory: 'Plumbing',
    servicePrice: 299,
    serviceDuration: 1.5,
    bookingDate: '2026-10-30',
    timeSlot: '09:00 AM - 12:00 PM',
    address: {
      street: 'Green Valley Residency, Paud Road, Kothrud',
      apartment: 'Flat 402, Wing A',
      city: 'Pune',
      zipCode: '411038',
      notes: 'Near MIT College; pipe under master bathroom washbasin is leaking.'
    },
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Technician Assigned',
    technician: TECHNICIANS[0],
    createdAt: '2026-10-26T14:20:00Z',
    totalAmount: 299
  },
  {
    id: 'HSM-3820',
    userId: 1,
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@example.com',
    userPhone: '+91 98765 43210',
    serviceId: 5,
    serviceName: 'Full Deep Home Cleaning',
    serviceCategory: 'House Cleaning',
    servicePrice: 1499,
    serviceDuration: 4.0,
    bookingDate: '2026-10-18',
    timeSlot: '01:00 PM - 05:00 PM',
    address: {
      street: 'Green Valley Residency, Paud Road, Kothrud',
      apartment: 'Flat 402, Wing A',
      city: 'Pune',
      zipCode: '411038',
      notes: 'Focus on kitchen chimney grease and bathroom floor tiles.'
    },
    paymentMethod: 'UPI / Card',
    paymentStatus: 'Paid',
    status: 'Completed',
    technician: TECHNICIANS[2],
    createdAt: '2026-10-14T10:15:00Z',
    discountApplied: 150,
    totalAmount: 1349,
    userRating: 5,
    userReview: 'Priya and team did an outstanding job! The floor and kitchen tiles look brand new. Will definitely book again.'
  },
  {
    id: 'HSM-4152',
    userId: 2,
    userName: 'Sneha Joshi',
    userEmail: 'sneha.joshi@example.com',
    userPhone: '+91 97654 32109',
    serviceId: 7,
    serviceName: 'AC Servicing & Gas Refill',
    serviceCategory: 'Appliance Repair',
    servicePrice: 599,
    serviceDuration: 1.5,
    bookingDate: '2026-10-31',
    timeSlot: '03:00 PM - 06:00 PM',
    address: {
      street: 'Blue Ridge Township, Hinjewadi Phase 1',
      apartment: 'Flat B-104',
      city: 'Pune',
      zipCode: '411057',
      notes: 'Split AC in living room not cooling properly.'
    },
    paymentMethod: 'Online (Simulated)',
    paymentStatus: 'Paid',
    status: 'Technician Assigned',
    technician: TECHNICIANS[3],
    createdAt: '2026-10-27T18:00:00Z',
    totalAmount: 599
  },
  {
    id: 'HSM-4208',
    userId: 3,
    userName: 'Rohan Mehta',
    userEmail: 'rohan.mehta@example.com',
    userPhone: '+91 99887 76655',
    serviceId: 3,
    serviceName: 'Electrical Circuit & Short-Fix',
    serviceCategory: 'Electrical',
    servicePrice: 349,
    serviceDuration: 1.5,
    bookingDate: '2026-11-01',
    timeSlot: '12:00 PM - 03:00 PM',
    address: {
      street: 'Plot 18, Harmony Park, ITI Road, Aundh',
      apartment: '2nd Floor',
      city: 'Pune',
      zipCode: '411007',
      notes: 'Kitchen geyser MCB tripping repeatedly.'
    },
    paymentMethod: 'UPI / Card',
    paymentStatus: 'Pending',
    status: 'Pending',
    createdAt: '2026-10-28T09:30:00Z',
    totalAmount: 349
  },
  {
    id: 'HSM-4265',
    userId: 4,
    userName: 'Ananya Iyer',
    userEmail: 'ananya.iyer@example.com',
    userPhone: '+91 98450 11223',
    serviceId: 9,
    serviceName: 'Interior Wall Painting & Touch-up',
    serviceCategory: 'Painting',
    servicePrice: 1999,
    serviceDuration: 6.0,
    bookingDate: '2026-11-02',
    timeSlot: '09:00 AM - 12:00 PM',
    address: {
      street: 'Sea Breeze Apartments, Hill Road, Bandra West',
      apartment: 'Flat 301',
      city: 'Mumbai',
      zipCode: '400050',
      notes: 'Living room accent wall repaint and putty touch-up.'
    },
    paymentMethod: 'UPI / Card',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    technician: TECHNICIANS[4],
    createdAt: '2026-10-28T11:15:00Z',
    totalAmount: 1999
  }
];
