import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, KeyRound, Radio, Users, Lock, Sparkles, Filter } from 'lucide-react';
import type { Room } from '../types';
import { SAMPLE_TRACKS } from '../assets/sampleTracks';
import { MOOD_CONFIGS } from '../features/mood/moodConfigs';

export const DiscoverPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [inviteError, setInviteError] = useState('');

  // Sample rooms for exploration & immediate testing
  const mockRooms: Room[] = [
    {
      id: 'room-late-night',
      name: 'Midnight Lo-Fi Loft',
      description: 'Chill instrumentals and rainy window beats for deep thought.',
      mood: 'chill',
      genre: 'Lo-Fi',
      is_private: false,
      created_by: 'usr_1',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      member_count: 34,
      current_track: SAMPLE_TRACKS[0],
    },
    {
      id: 'room-coding-flow',
      name: 'Full-Stack Hackathon Chamber',
      description: 'High concentration synthwave and electronic focus rhythm.',
      mood: 'focus',
      genre: 'Synthwave',
      is_private: false,
      created_by: 'usr_2',
      created_at: new Date(Date.now() - 7200000).toISOString(),
      member_count: 67,
      current_track: SAMPLE_TRACKS[1],
    },
    {
      id: 'room-tamil-melodies',
      name: 'Chennai Rain & Melodies',
      description: 'Acoustic classics and soothing violin chords.',
      mood: 'relaxed',
      genre: 'Tamil Melody',
      is_private: false,
      created_by: 'usr_3',
      created_at: new Date(Date.now() - 10800000).toISOString(),
      member_count: 51,
      current_track: SAMPLE_TRACKS[4],
    },
    {
      id: 'room-workout-gym',
      name: 'Iron Temple Energy',
      description: 'Heavy bass drops and cardio pumping rhythm.',
      mood: 'energetic',
      genre: 'EDM',
      is_private: false,
      created_by: 'usr_4',
      created_at: new Date(Date.now() - 1800000).toISOString(),
      member_count: 22,
      current_track: SAMPLE_TRACKS[3],
    },
    {
      id: 'room-vip-session',
      name: 'Secret Study Collective',
      description: 'Private research group audio space.',
      mood: 'focus',
      genre: 'Ambient',
      is_private: true,
      invite_code: 'CODE42',
      created_by: 'usr_5',
      created_at: new Date(Date.now() - 400000).toISOString(),
      member_count: 5,
      current_track: SAMPLE_TRACKS[1],
    },
  ];

  const handleJoinWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    const code = inviteCodeInput.trim().toUpperCase();
    if (!code) return;

    const matched = mockRooms.find((r) => r.invite_code === code);
    if (matched) {
      navigate(`/room/${matched.id}`);
    } else {
      // Allow entering any arbitrary invite code for user testing
      navigate(`/room/private-${code.toLowerCase()}`);
    }
  };

  const filteredRooms = mockRooms.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || r.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Radio className="w-7 h-7 text-purple-400" />
            <span>Discover Music Rooms</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Browse public listening sessions or unlock private rooms with an invitation code.
          </p>
        </div>

        {/* Private Code Form */}
        <form
          onSubmit={handleJoinWithCode}
          className="flex items-center gap-2 bg-[#11141c] border border-[#232b3d] p-1.5 rounded-xl"
        >
          <div className="relative">
            <KeyRound className="w-4 h-4 absolute left-3 top-3 text-purple-400" />
            <input
              type="text"
              placeholder="Invite code (e.g. CODE42)"
              value={inviteCodeInput}
              onChange={(e) => setInviteCodeInput(e.target.value)}
              className="bg-transparent pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 uppercase tracking-wider outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Enter Room
          </button>
        </form>
      </div>

      {inviteError && (
        <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/50 p-2.5 rounded-xl">
          {inviteError}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search rooms by title, description or mood..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#11141c] border border-[#232b3d] focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-sm text-white outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-[#11141c] border border-[#232b3d] rounded-xl px-3 py-2 text-xs text-gray-200 outline-none"
          >
            <option value="all">All Genres</option>
            <option value="Lo-Fi">Lo-Fi</option>
            <option value="Synthwave">Synthwave</option>
            <option value="Tamil Melody">Tamil Melody</option>
            <option value="EDM">EDM</option>
            <option value="Ambient">Ambient</option>
          </select>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRooms.map((room) => {
          const moodConfig = MOOD_CONFIGS[room.mood];
          return (
            <div
              key={room.id}
              className="bg-[#11141c] border border-[#232b3d] hover:border-purple-500/50 rounded-2xl p-5 flex flex-col justify-between transition group hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[#161b26] border border-[#232b3d] text-gray-300">
                    <span>{moodConfig.emoji}</span>
                    <span>{moodConfig.label}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    {room.is_private ? (
                      <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/40 border border-amber-900/40 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        <span>Private</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 rounded-full">
                        <Users className="w-3 h-3" />
                        <span>{room.member_count} listening</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">
                  {room.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {room.description}
                </p>

                {room.current_track && (
                  <div className="mt-4 p-2.5 rounded-xl bg-[#161b26] border border-[#232b3d] flex items-center gap-3">
                    <img
                      src={room.current_track.cover_url}
                      alt={room.current_track.title}
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                    <div className="overflow-hidden">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wider">Now Playing</p>
                      <p className="text-xs font-semibold text-gray-200 truncate">{room.current_track.title}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-[#232b3d] flex items-center justify-between">
                <span className="text-xs text-gray-500">{room.genre}</span>
                <Link
                  to={`/room/${room.id}`}
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition"
                >
                  Join Room
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

