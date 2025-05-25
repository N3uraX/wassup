import { create } from 'zustand';
import { CallHistory, User } from '@/types';
import { mockCalls } from '@/assets/data/mockData';

interface CallsState {
  calls: CallHistory[];
  isLoading: boolean;
  error: string | null;
  
  fetchCalls: () => Promise<void>;
  addCall: (call: Omit<CallHistory, 'id' | 'timestamp'>) => void;
}

export const useCallsStore = create<CallsState>((set) => ({
  calls: mockCalls,
  isLoading: false,
  error: null,
  
  fetchCalls: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        calls: mockCalls,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false
      });
    }
  },
  
  addCall: (callData) => {
    const newCall: CallHistory = {
      id: `call-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...callData
    };
    
    set(state => ({
      calls: [newCall, ...state.calls]
    }));
  }
}));