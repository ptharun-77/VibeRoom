import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, Globe, Sparkles } from 'lucide-react';
import type { MoodType, Room } from '../../types';
import { ALL_MOODS } from '../mood/moodConfigs';
import { useRoomStore } from '../../stores/useRoomStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { SAMPLE_TRACKS } from '../../assets/sampleTracks';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setActiveRoom = useRoomStore((state) => state.setActiveRoom);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState<MoodType>('chill');
  const [genre, setGenre] = useState('Lo-Fi');
  const [isPrivate, setIsPrivate] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const roomId = `room-${Date.now().toString(36)}`;
    const inviteCode = isPrivate
      ? Math.random().toString(36).substring(2, 8).toUpperCase()
      : undefined;

    const newRoom: Room = {
      id: roomId,
      name: name.trim(),
      description: description.trim() || 'A space to vibe together.',
      mood,
      genre,
      is_private: isPrivate,
      invite_code: inviteCode,
      created_by: user?.id || 'anonymous',
      created_at: new Date().toISOString(),
      member_count: 1,
      current_track: SAMPLE_TRACKS[0],
      host: user || undefined,
    };

    setActiveRoom(newRoom);
    onClose();
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#11141c] border border-[#232b3d] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 text-purple-400">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-xl font-bold text-white">Create a Music Room</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Room Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Midnight Lo-Fi Sanctuary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none text-white transition placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <input
              type="text"
              placeholder="What is the mood of this room?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none text-white transition placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Select Room Mood
            </label>
            <div className="grid grid-cols-5 gap-2">
              {ALL_MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-medium transition ${
                    mood === m.id
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-md'
                      : 'bg-[#161b26] border-[#232b3d] text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <span className="text-xl mb-1">{m.emoji}</span>
                  <span className="truncate w-full text-center">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Genre / Tag
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none text-white transition"
            >
              <option value="Lo-Fi">Lo-Fi / Ambient</option>
              <option value="Coding Focus">Coding Focus / Synthwave</option>
              <option value="Tamil Melody">Tamil Melodies</option>
              <option value="EDM / Energy">EDM / Workout Energy</option>
              <option value="Acoustic">Acoustic / Indie</option>
            </select>
          </div>

          {/* Privacy Toggle */}
          <div className="pt-2 border-t border-[#232b3d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isPrivate ? (
                <Lock className="w-4 h-4 text-purple-400" />
              ) : (
                <Globe className="w-4 h-4 text-emerald-400" />
              )}
              <div>
                <p className="text-sm font-medium">{isPrivate ? 'Private Room' : 'Public Room'}</p>
                <p className="text-xs text-gray-400">
                  {isPrivate ? 'Joinable via 6-digit invitation code only' : 'Visible in room discovery'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPrivate(!isPrivate)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                isPrivate ? 'bg-purple-600 justify-end' : 'bg-[#232b3d] justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform" />
            </button>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-purple-600/30 transition active:scale-[0.98]"
            >
              Launch Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

