import type { Track } from '../types';

/**
 * Royalty-free, public-domain audio samples for local development & demonstration.
 * Audio sources: SoundHelix & Internet Archive public media.
 */
export const SAMPLE_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Midnight Lo-Fi Echoes',
    artist: 'VibeRoom Collective',
    album: 'Late Night Chill Vol. 1',
    duration: 372,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover_url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    genre: 'Lo-Fi / Ambient',
    mood: 'chill',
  },
  {
    id: 'track-2',
    title: 'Deep Focus Flow',
    artist: 'Syntax & Flow',
    album: 'Binary Zen',
    duration: 423,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    genre: 'Synthwave / Study',
    mood: 'focus',
  },
  {
    id: 'track-3',
    title: 'Solar Radiance',
    artist: 'Golden Horizon',
    album: 'Endless Summer',
    duration: 345,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    genre: 'Indie Dance / Pop',
    mood: 'happy',
  },
  {
    id: 'track-4',
    title: 'Kinetic Velocity',
    artist: 'Pulse Drive',
    album: 'Hyperdrive',
    duration: 302,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    cover_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    genre: 'Electro / Bass',
    mood: 'energetic',
  },
  {
    id: 'track-5',
    title: 'Autumn Rain & Tea',
    artist: 'Serenity Strings',
    album: 'Quiet Horizons',
    duration: 388,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    cover_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
    genre: 'Acoustic / Calm',
    mood: 'relaxed',
  },
];

