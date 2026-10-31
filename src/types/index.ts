export type MoodType = 'happy' | 'chill' | 'focus' | 'energetic' | 'relaxed';

export interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  audio_url: string;
  cover_url: string;
  genre: string;
  mood: MoodType;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  mood: MoodType;
  genre: string;
  community_tag?: string;
  is_private: boolean;
  invite_code?: string;
  created_by: string;
  created_at: string;
  current_track_id?: string;
  // Computed / joined fields
  host?: UserProfile;
  member_count?: number;
  current_track?: Track;
}

export interface RoomMember {
  id: string;
  room_id: string;
  user_id: string;
  role: 'host' | 'dj' | 'listener';
  joined_at: string;
  profile?: UserProfile;
}

export type QueueItemStatus = 'queued' | 'playing' | 'played';

export interface QueueItem {
  id: string;
  room_id: string;
  track_id: string;
  added_by: string;
  status: QueueItemStatus;
  vote_count: number;
  created_at: string;
  track?: Track;
  added_by_profile?: UserProfile;
  has_voted?: boolean;
}

export interface Vote {
  id: string;
  queue_item_id: string;
  user_id: string;
  created_at: string;
}

export interface PlaybackState {
  room_id: string;
  track_id: string | null;
  is_playing: boolean;
  position_seconds: number;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: UserProfile;
}

export interface LiveReaction {
  id: string;
  room_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface MoodConfig {
  id: MoodType;
  label: string;
  description: string;
  emoji: string;
  color: string;
  bgGradient: string;
  accentBorder: string;
}

