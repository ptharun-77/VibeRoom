import type { MoodConfig, MoodType } from '../../types';

export const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
  happy: {
    id: 'happy',
    label: 'Happy',
    description: 'Upbeat melodies, sunshine grooves, and positive frequencies.',
    emoji: '☀️',
    color: '#F59E0B',
    bgGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentBorder: 'border-amber-500/40 hover:border-amber-500',
  },
  chill: {
    id: 'chill',
    label: 'Chill',
    description: 'Laid-back beats, lo-fi textures, and late-night quiet vibes.',
    emoji: '🌙',
    color: '#8B5CF6',
    bgGradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    accentBorder: 'border-purple-500/40 hover:border-purple-500',
  },
  focus: {
    id: 'focus',
    label: 'Focus',
    description: 'Instrumental flow states, coding focus, and binaural rhythms.',
    emoji: '🧠',
    color: '#3B82F6',
    bgGradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    accentBorder: 'border-blue-500/40 hover:border-blue-500',
  },
  energetic: {
    id: 'energetic',
    label: 'Energetic',
    description: 'High BPM, workout energy, driving synths, and bass drops.',
    emoji: '⚡',
    color: '#EF4444',
    bgGradient: 'from-red-500/20 via-pink-500/10 to-transparent',
    accentBorder: 'border-red-500/40 hover:border-red-500',
  },
  relaxed: {
    id: 'relaxed',
    label: 'Relaxed',
    description: 'Gentle acoustics, ambient soundscapes, and calm breathing room.',
    emoji: '🍃',
    color: '#10B981',
    bgGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentBorder: 'border-emerald-500/40 hover:border-emerald-500',
  },
};

export const ALL_MOODS = Object.values(MOOD_CONFIGS);

