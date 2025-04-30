import { ContactForm } from '../types';
import emailjs from '@emailjs/browser';

// Simulated API call to send contact form email
export const sendContactEmail = async (formData: ContactForm): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Contact form submitted:', formData);
  
  // In a real app, this would use a service like EmailJS or send to a backend
  // For demo purposes, let's just log it
  // Example of how EmailJS would be used:
  /*
  return emailjs.send(
    'service_id',
    'template_id',
    formData,
    'user_id'
  );
  */
};

// Simulated API call to send booking confirmation email
export const sendBookingConfirmation = async (
  email: string, 
  bookingId: string, 
  bookingDetails: any
): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  console.log(`Booking confirmation email sent to ${email} for booking ${bookingId}`);
  
  // In a real app, this would send an actual email
};