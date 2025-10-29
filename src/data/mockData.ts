import { ProviderStats, Booking, Review } from '../types';

export const mockStats: ProviderStats = {
  views: {
    today: 142,
    thisWeek: 856,
    thisMonth: 3421,
  },
  bookings: {
    today: 5,
    thisWeek: 28,
    thisMonth: 94,
  },
  rating: 4.8,
  reviewCount: 127,
  revenue: {
    thisMonth: 14250,
  },
};

export const mockBookings: Booking[] = [
  {
    id: '1',
    patientName: 'Jane D.',
    service: 'Annual Physical',
    date: '2025-10-26',
    time: '09:00',
    status: 'confirmed',
    duration: 45,
  },
  {
    id: '2',
    patientName: 'John S.',
    service: 'Sick Visit',
    date: '2025-10-26',
    time: '10:00',
    status: 'confirmed',
    duration: 30,
  },
  {
    id: '3',
    patientName: 'Sarah M.',
    service: 'Wellness Checkup',
    date: '2025-10-26',
    time: '11:30',
    status: 'confirmed',
    duration: 30,
  },
  {
    id: '4',
    patientName: 'Michael R.',
    service: 'Lab Work',
    date: '2025-10-26',
    time: '14:00',
    status: 'confirmed',
    duration: 15,
  },
  {
    id: '5',
    patientName: 'Emily W.',
    service: 'Flu Shot',
    date: '2025-10-26',
    time: '15:30',
    status: 'confirmed',
    duration: 15,
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    rating: 5,
    text: 'Best doctor I\'ve ever had! Very thorough and caring.',
    patientName: 'Sarah M.',
    date: '2025-10-20',
    verified: true,
  },
  {
    id: '2',
    rating: 5,
    text: 'Great experience. The office staff was friendly and professional.',
    patientName: 'John D.',
    date: '2025-10-18',
    verified: true,
  },
  {
    id: '3',
    rating: 4,
    text: 'Good service, but wait time was a bit long.',
    patientName: 'Mike R.',
    date: '2025-10-15',
    verified: true,
  },
];

export const mockChartData = [
  { name: 'Week 1', bookings: 18 },
  { name: 'Week 2', bookings: 22 },
  { name: 'Week 3', bookings: 25 },
  { name: 'Week 4', bookings: 29 },
];
