import { Booking } from '../types';

// Simulated API call to create a booking
export const createBooking = async (bookingData: Partial<Booking>): Promise<{ bookingId: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a random booking ID (in a real app, this would come from the backend)
  const bookingId = `BK-${Math.floor(Math.random() * 10000)}`;
  
  console.log('Booking created:', { ...bookingData, id: bookingId });
  
  // In a real app, this would send the data to a backend API
  return { bookingId };
};

// Simulated API call to fetch bookings
export const fetchBookings = async (): Promise<Booking[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would fetch from an API
  // Here we return an empty array as mock data is handled in the admin component
  return [];
};

// Simulated API call to update booking status
export const updateBookingStatus = async (
  bookingId: string, 
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`Booking ${bookingId} status updated to ${status}`);
  
  // In a real app, this would make an API call to update the booking
};