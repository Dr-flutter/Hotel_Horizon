export type Room = {
  id: string;
  name: string;
  type: string;
  description: string;
  longDescription?: string;
  pricePerNight: number;
  capacity: number;
  size: number;
  amenities: string[];
  images: string[];
  status: 'available' | 'unavailable' | 'maintenance';
  isAvailable?: boolean;
};

export type Booking = {
  id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
};

export type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  lastLogin: string;
  createdAt: string;
  active: boolean;
};