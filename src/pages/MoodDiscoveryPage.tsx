import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, Users, ArrowRight } from 'lucide-react';
import type { MoodType, Room } from '../types';
import { ALL_MOODS, MOOD_CONFIGS } from '../features/mood/moodConfigs';
import { SAMPLE_TRACKS } from '../assets/sampleTracks';

export const MoodDiscoveryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMood = (searchParams.get('mood') as MoodType) || 'chill';
  const [selectedMood, setSelectedMood] = useState<MoodType>(initialMood);

  useEffect(() => {
    const param = searchParams.get('mood') as MoodType;
    if (param && MOOD_CONFIGS[param]) {
      setSelectedMood(param);
    }
  }, [searchParams]);

  const handleSelectMood = (mood: MoodType) => {
    setSelectedMood(mood);
    setSearchParams({ mood });
  };

  const currentMoodConfig = MOOD_CONFIGS[selectedMood];

  // Rule-based mock room matching for each mood
  const moodRooms: Record<MoodType, Room[]> = {
    chill: [
      {
        id: 'room-chill-1',
        name: 'Late Night Coding & Tea',
        description: 'Lo-fi beats to relax, code and think to.',
        mood: 'chill',
        genre: 'Lo-Fi',
        is_private: false,
        created_by: 'usr_1',
        created_at: new Date().toISOString(),
        member_count: 42,
        current_track: SAMPLE_TRACKS[0],
      },
      {
        id: 'room-chill-2',
        name: 'Rainy Rooftop Resonance',
        description: 'Cozy ambient soundscapes with distant thunder.',
        mood: 'chill',
        genre: 'Ambient',
        is_private: false,
        created_by: 'usr_2',
        created_at: new Date().toISOString(),
        member_count: 18,
        current_track: SAMPLE_TRACKS[4],
      },
    ],
    focus: [
      {
        id: 'room-focus-1',
        name: 'Deep Algorithmic Flow',
        description: 'Zero distractions. Binary synth rhythms for high productivity.',
        mood: 'focus',
        genre: 'Synthwave',
        is_private: false,
        created_by: 'usr_3',
        created_at: new Date().toISOString(),
        member_count: 65,
        current_track: SAMPLE_TRACKS[1],
      },
      {
        id: 'room-focus-2',
        name: 'Library of Alexandria Audio',
        description: 'Binaural study frequencies for intense exam prep.',
        mood: 'focus',
        genre: 'Acoustic / Minimal',
        is_private: false,
        created_by: 'usr_4',
        created_at: new Date().toISOString(),
        member_count: 27,
        current_track: SAMPLE_TRACKS[1],
      },
    ],
    happy: [
      {
        id: 'room-happy-1',
        name: 'Solar Euphoria',
        description: 'Bright synthesizers and uplifting chord progressions.',
        mood: 'happy',
        genre: 'Indie Dance',
        is_private: false,
        created_by: 'usr_5',
        created_at: new Date().toISOString(),
        member_count: 33,
        current_track: SAMPLE_TRACKS[2],
      },
    ],
    energetic: [
      {
        id: 'room-energy-1',
        name: 'Hyperdrive Cardio Zone',
        description: 'Fast BPM electronic tracks to fuel workout endurance.',
        mood: 'energetic',
        genre: 'Electro / Bass',
        is_private: false,
        created_by: 'usr_6',
        created_at: new Date().toISOString(),
        member_count: 48,
        current_track: SAMPLE_TRACKS[3],
      },
    ],
    relaxed: [
      {
        id: 'room-relaxed-1',
        name: 'Green Tea & Acoustic Strings',
        description: 'Unwind your thoughts with delicate fingerstyle guitar.',
        mood: 'relaxed',
        genre: 'Acoustic',
        is_private: false,
        created_by: 'usr_7',
        created_at: new Date().toISOString(),
        member_count: 29,
        current_track: SAMPLE_TRACKS[4],
      },
    ],
  };

  const activeRooms = moodRooms[selectedMood] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/40 text-purple-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mood-Driven Engine</span>
        </div>
        <h1 className="text-3xl font-bold text-white">How do you want to feel right now?</h1>
        <p className="text-sm text-gray-400 mt-1">
          Select a mood frequency to discover rooms tuned to your exact emotional and mental state.
        </p>
      </div>

      {/* Interactive Mood Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {ALL_MOODS.map((m) => {
          const isSelected = selectedMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelectMood(m.id)}
              className={`p-5 rounded-2xl text-left border transition relative overflow-hidden group ${
                isSelected
                  ? `bg-gradient-to-br ${m.bgGradient} bg-[#161b26] border-purple-500 shadow-xl ring-2 ring-purple-500/40`
                  : 'bg-[#11141c] border-[#232b3d] hover:border-gray-600'
              }`}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {m.emoji}
              </div>
              <h3 className="font-bold text-base text-white">{m.label}</h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {m.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Mood Showcase Banner */}
      <div
        className={`p-6 rounded-3xl bg-gradient-to-r ${currentMoodConfig.bgGradient} bg-[#11141c] border border-[#232b3d] flex flex-col sm:flex-row items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{currentMoodConfig.emoji}</span>
          <div>
            <h2 className="text-xl font-bold text-white">
              Currently tuned to <span style={{ color: currentMoodConfig.color }}>{currentMoodConfig.label}</span>
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">{currentMoodConfig.description}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400 bg-[#161b26] px-3 py-1.5 rounded-full border border-[#232b3d]">
          {activeRooms.length} active room(s)
        </span>
      </div>

      {/* Matching Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {activeRooms.map((room) => (
          <div
            key={room.id}
            className="bg-[#11141c] border border-[#232b3d] hover:border-purple-500/50 rounded-2xl p-6 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 bg-[#161b26] px-2.5 py-1 rounded-full border border-[#232b3d]">
                  {room.genre}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-800/40">
                  <Users className="w-3.5 h-3.5" />
                  <span>{room.member_count} connected</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">{room.name}</h3>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{room.description}</p>

              {room.current_track && (
                <div className="mt-4 p-3 rounded-xl bg-[#161b26] border border-[#232b3d] flex items-center gap-3">
                  <img
                    src={room.current_track.cover_url}
                    alt={room.current_track.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-[11px] text-gray-400">Current Track</p>
                    <p className="text-xs font-semibold text-gray-100">{room.current_track.title}</p>
                    <p className="text-[11px] text-gray-400">{room.current_track.artist}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#232b3d] flex items-center justify-end">
              <Link
                to={`/room/${room.id}`}
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-md"
              >
                <span>Tune into Room</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

