import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// In a real app, this would make API calls to a backend service
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo credentials check
        if (email === 'admin@hotel-horizon.fr' && password === 'admin123') {
          const user = {
            id: 'USR-001',
            name: 'Admin Principal',
            email: 'admin@hotel-horizon.fr',
            role: 'admin'
          };
          
          set({ user, isAuthenticated: true });
          return;
        }
        
        throw new Error('Invalid credentials');
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
      // Only store the user ID in localStorage for security
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }),
    }
  )
);