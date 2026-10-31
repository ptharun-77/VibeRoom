import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Sparkles, Radio, Users, Flame, ArrowRight, Play } from 'lucide-react';
import { ALL_MOODS } from '../features/mood/moodConfigs';
import { SAMPLE_TRACKS } from '../assets/sampleTracks';
import { usePlayerStore } from '../stores/usePlayerStore';

interface OutletContextType {
  openCreateModal: () => void;
}

export const HomePage: React.FC = () => {
  const { openCreateModal } = useOutletContext<OutletContextType>();
  const { setCurrentTrack, play } = usePlayerStore();

  const publicCommunities = [
    {
      id: 'comm-1',
      name: 'Late Night Chill',
      desc: 'Mellow beats, midnight introspection, and rainfall vibes.',
      mood: 'chill',
      listeners: 24,
      tag: 'Ambient',
      gradient: 'from-purple-900/40 via-indigo-900/20 to-transparent',
    },
    {
      id: 'comm-2',
      name: 'Coding Focus',
      desc: 'Binaural synthwave & lo-fi for non-stop algorithmic flow.',
      mood: 'focus',
      listeners: 58,
      tag: 'Synthwave',
      gradient: 'from-blue-900/40 via-cyan-900/20 to-transparent',
    },
    {
      id: 'comm-3',
      name: 'Tamil Melody Lovers',
      desc: 'Soulful chords, acoustic melodies, and legendary harmony.',
      mood: 'relaxed',
      listeners: 43,
      tag: 'Acoustic',
      gradient: 'from-emerald-900/40 via-teal-900/20 to-transparent',
    },
    {
      id: 'comm-4',
      name: 'Workout Energy',
      desc: 'High BPM, heavy electronic drums, and maximum motivation.',
      mood: 'energetic',
      listeners: 31,
      tag: 'Bass / EDM',
      gradient: 'from-red-900/40 via-pink-900/20 to-transparent',
    },
    {
      id: 'comm-5',
      name: 'Weekend Party',
      desc: 'Upbeat anthems, celebratory disco grooves, and good friends.',
      mood: 'happy',
      listeners: 19,
      tag: 'Pop / Disco',
      gradient: 'from-amber-900/40 via-orange-900/20 to-transparent',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#181e2c] via-[#11141c] to-[#0a0c10] border border-[#232b3d] p-8 md:p-14 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/70 border border-purple-700/40 text-purple-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Synchronized Social Music Listening</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          One song. One room.{' '}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
            Everyone connected.
          </span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          Discover music rooms tailored to your mood, vote collaboratively for the next song with a democratic queue, and share live audio reactions in real time.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-purple-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Radio className="w-4 h-4" />
            <span>Create Your Room</span>
          </button>

          <Link
            to="/discover"
            className="flex items-center gap-2 bg-[#161b26] hover:bg-[#1e2536] text-gray-200 border border-[#232b3d] font-semibold px-6 py-3 rounded-xl transition"
          >
            <span>Explore Rooms</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Mood Fast-Filter Bar */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Tune in by Mood</span>
          </h2>
          <Link to="/moods" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
            <span>View All Moods</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ALL_MOODS.map((m) => (
            <Link
              key={m.id}
              to={`/moods?mood=${m.id}`}
              className={`p-4 rounded-2xl bg-[#11141c] border ${m.accentBorder} transition group hover:shadow-lg`}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {m.emoji}
              </div>
              <h3 className="font-semibold text-white text-sm">{m.label}</h3>
              <p className="text-xs text-gray-400 line-clamp-1 mt-1">{m.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Public Communities */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-pink-500" />
            <h2 className="text-xl font-bold text-white">Public Music Communities</h2>
          </div>
          <span className="text-xs text-gray-400">Live Active Rooms</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publicCommunities.map((comm) => (
            <div
              key={comm.id}
              className={`p-5 rounded-2xl bg-gradient-to-br ${comm.gradient} bg-[#11141c] border border-[#232b3d] hover:border-purple-500/50 transition flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#161b26] border border-[#232b3d] text-gray-300">
                    {comm.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/40">
                    <Users className="w-3 h-3" />
                    <span>{comm.listeners} listening</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">
                  {comm.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {comm.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#232b3d] flex items-center justify-between">
                <button
                  onClick={() => {
                    setCurrentTrack(SAMPLE_TRACKS[0]);
                    play();
                  }}
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Preview Audio</span>
                </button>

                <Link
                  to={`/room/${comm.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg transition"
                >
                  <span>Join Room</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

