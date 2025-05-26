import { create } from 'zustand';

export interface Community {
  id: string;
  name: string;
  description: string;
  icon?: string;
  members?: string[];
}

interface CommunitiesState {
  communities: Community[];
  addCommunity: (community: Omit<Community, 'id'>) => void;
}

export const useCommunitiesStore = create<CommunitiesState>((set, get) => ({
  communities: [
    { id: '1', name: 'React Devs', description: 'A place for React enthusiasts.' },
    { id: '2', name: 'Football Fans', description: 'Discuss all things football.' },
  ],
  addCommunity: (community) => {
    set(state => ({
      communities: [
        ...state.communities,
        { ...community, id: Date.now().toString() },
      ],
    }));
  },
}));
