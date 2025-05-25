import { create } from 'zustand';
import { User } from '@/types';
import { getCurrentUser } from '@/assets/data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (phone: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getCurrentUser(),
  isAuthenticated: true, // For demo purposes, set to true
  isLoading: false,
  error: null,
  
  login: async (phone: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (phone === '+1 (555) 555-5555') {
        set({ 
          user: getCurrentUser(),
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        throw new Error('Invalid phone number');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
        isAuthenticated: false
      });
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: (updates: Partial<User>) => {
    set(state => ({
      user: state.user ? { ...state.user, ...updates } : null
    }));
  }
}));