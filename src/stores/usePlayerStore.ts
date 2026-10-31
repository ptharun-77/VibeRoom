import { create } from 'zustand';
import type { Track } from '../types';
import { SAMPLE_TRACKS } from '../assets/sampleTracks';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  
  // Actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setCurrentTrack: (track: Track | null) => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  updateProgress: (currentTime: number, duration: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: SAMPLE_TRACKS[0], // Default track to ready player
  isPlaying: false,
  currentTime: 0,
  duration: SAMPLE_TRACKS[0].duration,
  volume: 0.8,
  isMuted: false,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setCurrentTrack: (track) =>
    set({
      currentTrack: track,
      currentTime: 0,
      duration: track ? track.duration : 0,
      isPlaying: track ? true : false,
    }),
  seek: (currentTime) => set({ currentTime }),
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  updateProgress: (currentTime, duration) =>
    set({
      currentTime,
      duration: duration > 0 ? duration : 0,
    }),
}));

