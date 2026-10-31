import { create } from 'zustand';
import type { UserProfile } from '../types';

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

// Initial mock profile for smooth onboarding and offline testing
const DEMO_USER: UserProfile = {
  id: 'usr_demo_42',
  username: 'vibe_cadet',
  display_name: 'Alex (CSE Student)',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  bio: 'Exploring soundscapes and code flow.',
  created_at: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>((set) => ({
  user: DEMO_USER,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null }),
}));

