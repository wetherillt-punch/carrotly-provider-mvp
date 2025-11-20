export interface Provider {
  id: string;
  
  // Step 1: Basics
  practiceName: string;
  providerTypes: string[];
  phone: string;
  email: string;
  
  // Step 2: Location
  address: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
  };
  website?: string;
  
  // Step 3: Photos
  photos: {
    primary: string;
    gallery: string[];
  };
  
  // Step 4: Services
  services: string[]; // IDs from standardized service list
  
  // Step 5: Optional Info
  optionalInfo?: {
    licenseNumber?: string;
    licenseState?: string;
    licenseExpiration?: string;
    certifications?: string[];
    insuranceAccepted?: string[];
    yearsExperience?: number;
    education?: string;
    specializations?: string[];
    languagesSpoken?: string[];
  };
  
  // Step 7: Agreement
  agreement?: {
    initials: Record<number, string>;
    signature: string;
    title?: string;
    agreedDate: string;
    ipAddress?: string;
    version: string;
  };
  
  // Metadata
  createdAt: string;
  completedAt?: string;
  status: 'draft' | 'pending' | 'approved';
}

export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  category: string;
}

export interface ProviderType {
  value: string;
  label: string;
  icon: string;
  serviceCategories: string[];
}

export interface ProviderStats {
  views: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  bookings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  rating: number;
  reviewCount: number;
  revenue: {
    thisMonth: number;
  };
}

export interface Booking {
  id: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  duration: number;
}

export interface Review {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  patientName: string;
  date: string;
  verified: boolean;
}
