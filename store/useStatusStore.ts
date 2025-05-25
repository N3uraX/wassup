import { create } from 'zustand';
import { StatusUpdate } from '@/types';
import { mockStatusUpdates } from '@/assets/data/mockData';

interface StatusState {
  statusUpdates: StatusUpdate[];
  viewedStatuses: string[];
  isLoading: boolean;
  error: string | null;
  
  fetchStatusUpdates: () => Promise<void>;
  addStatus: (content: StatusUpdate['content']) => void;
  markAsViewed: (statusId: string) => void;
}

export const useStatusStore = create<StatusState>((set, get) => ({
  statusUpdates: mockStatusUpdates,
  viewedStatuses: [],
  isLoading: false,
  error: null,
  
  fetchStatusUpdates: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        statusUpdates: mockStatusUpdates,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false
      });
    }
  },
  
  addStatus: (content: StatusUpdate['content']) => {
    const newStatus: StatusUpdate = {
      id: `status-${Date.now()}`,
      user: {
        id: 'me',
        name: 'You',
        avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=256',
        status: 'Available',
        lastSeen: new Date().toISOString(),
        phone: '+1 (555) 555-5555',
        isOnline: true
      },
      timestamp: new Date().toISOString(),
      content,
      seenBy: [],
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
    };
    
    set(state => ({
      statusUpdates: [newStatus, ...state.statusUpdates]
    }));
  },
  
  markAsViewed: (statusId: string) => {
    set(state => ({
      viewedStatuses: [...state.viewedStatuses, statusId]
    }));
  }
}));