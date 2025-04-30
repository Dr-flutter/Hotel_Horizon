import { create } from 'zustand';
import { Room, Booking, User } from '../types';

type AdminState = {
  // Room Management
  rooms: Room[];
  addRoom: (room: Room) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  toggleRoomStatus: (id: string) => void;
  
  // Booking Management
  bookings: Booking[];
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;
  
  // User Management
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  
  // Stats
  getStats: () => {
    totalBookings: number;
    occupancyRate: number;
    revenue: number;
    pendingBookings: number;
  };
};

export const useAdmin = create<AdminState>((set, get) => ({
  rooms: [],
  bookings: [],
  users: [],
  
  // Room Management
  addRoom: (room: Room) => {
    set(state => ({
      rooms: [...state.rooms, room]
    }));
  },
  
  updateRoom: (id: string, updates: Partial<Room>) => {
    set(state => ({
      rooms: state.rooms.map(room => 
        room.id === id ? { ...room, ...updates } : room
      )
    }));
  },
  
  deleteRoom: (id: string) => {
    set(state => ({
      rooms: state.rooms.filter(room => room.id !== id)
    }));
  },
  
  toggleRoomStatus: (id: string) => {
    set(state => ({
      rooms: state.rooms.map(room => 
        room.id === id 
          ? { ...room, status: room.status === 'available' ? 'unavailable' : 'available' }
          : room
      )
    }));
  },
  
  // Booking Management
  updateBookingStatus: (id: string, status: Booking['status']) => {
    set(state => ({
      bookings: state.bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      )
    }));
  },
  
  deleteBooking: (id: string) => {
    set(state => ({
      bookings: state.bookings.filter(booking => booking.id !== id)
    }));
  },
  
  // User Management
  addUser: (user: User) => {
    set(state => ({
      users: [...state.users, user]
    }));
  },
  
  updateUser: (id: string, updates: Partial<User>) => {
    set(state => ({
      users: state.users.map(user => 
        user.id === id ? { ...user, ...updates } : user
      )
    }));
  },
  
  deleteUser: (id: string) => {
    set(state => ({
      users: state.users.filter(user => user.id !== id)
    }));
  },
  
  toggleUserStatus: (id: string) => {
    set(state => ({
      users: state.users.map(user => 
        user.id === id ? { ...user, active: !user.active } : user
      )
    }));
  },
  
  // Stats
  getStats: () => {
    const state = get();
    const totalBookings = state.bookings.length;
    const occupiedRooms = state.rooms.filter(room => room.status === 'unavailable').length;
    const totalRooms = state.rooms.length;
    const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;
    const revenue = state.bookings
      .filter(booking => booking.status === 'completed')
      .reduce((total, booking) => total + booking.totalPrice, 0);
    const pendingBookings = state.bookings.filter(booking => booking.status === 'pending').length;
    
    return {
      totalBookings,
      occupancyRate,
      revenue,
      pendingBookings
    };
  }
}));