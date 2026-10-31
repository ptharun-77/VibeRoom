import React, { useState } from 'react';
import { Search, Play, Pause, Library, Clock, Music } from 'lucide-react';
import { SAMPLE_TRACKS } from '../assets/sampleTracks';
import { usePlayerStore } from '../stores/usePlayerStore';
import { formatTime } from '../utils/time';
import { MOOD_CONFIGS } from '../features/mood/moodConfigs';
import type { Track } from '../types';

export const LibraryPage: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, setCurrentTrack } = usePlayerStore();
  const [search, setSearch] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('all');

  const filteredTracks = SAMPLE_TRACKS.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase()) ||
      track.genre.toLowerCase().includes(search.toLowerCase());
    const matchesMood = selectedMood === 'all' || track.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack(track);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Library className="w-7 h-7 text-purple-400" />
          <span>Authorized Music Library</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Stream royalty-free and public domain audio tracks authorized for communal listening.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, artist, or genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#11141c] border border-[#232b3d] focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-sm text-white outline-none transition"
          />
        </div>

        <select
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
          className="bg-[#11141c] border border-[#232b3d] rounded-xl px-3 py-2 text-xs text-gray-200 outline-none w-full sm:w-auto"
        >
          <option value="all">All Moods</option>
          <option value="happy">Happy</option>
          <option value="chill">Chill</option>
          <option value="focus">Focus</option>
          <option value="energetic">Energetic</option>
          <option value="relaxed">Relaxed</option>
        </select>
      </div>

      {/* Track List */}
      <div className="bg-[#11141c] border border-[#232b3d] rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-gray-400 border-b border-[#232b3d] bg-[#161b26]/60">
          <span className="col-span-1 text-center">#</span>
          <span className="col-span-6 sm:col-span-5">Title</span>
          <span className="hidden sm:block col-span-3">Genre</span>
          <span className="col-span-3 sm:col-span-2">Mood</span>
          <span className="col-span-2 sm:col-span-1 text-right flex justify-end items-center">
            <Clock className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="divide-y divide-[#232b3d]/50">
          {filteredTracks.map((track, index) => {
            const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
            const mood = MOOD_CONFIGS[track.mood];

            return (
              <div
                key={track.id}
                className={`grid grid-cols-12 items-center px-5 py-3 text-sm hover:bg-white/5 transition group ${
                  currentTrack?.id === track.id ? 'bg-purple-950/20' : ''
                }`}
              >
                {/* Index / Play Button */}
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => handlePlayTrack(track)}
                    className="w-7 h-7 rounded-full bg-[#161b26] group-hover:bg-purple-600 flex items-center justify-center text-gray-300 group-hover:text-white transition"
                  >
                    {isThisTrackPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Title & Artist */}
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3 overflow-hidden">
                  <img
                    src={track.cover_url}
                    alt={track.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="overflow-hidden">
                    <p className={`font-semibold truncate text-xs sm:text-sm ${currentTrack?.id === track.id ? 'text-purple-300' : 'text-gray-200'}`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                  </div>
                </div>

                {/* Genre */}
                <div className="hidden sm:block col-span-3 text-xs text-gray-400">
                  {track.genre}
                </div>

                {/* Mood Badge */}
                <div className="col-span-3 sm:col-span-2">
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#161b26] border border-[#232b3d] text-gray-300">
                    <span>{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </span>
                </div>

                {/* Duration */}
                <div className="col-span-2 sm:col-span-1 text-right text-xs text-gray-400 tabular-nums">
                  {formatTime(track.duration)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

