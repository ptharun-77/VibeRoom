import React, { useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc3, Radio } from 'lucide-react';
import { usePlayerStore } from '../../stores/usePlayerStore';
import { useRoomStore } from '../../stores/useRoomStore';
import { formatTime } from '../../utils/time';

export const GlobalAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    updateProgress,
    seek,
    setVolume,
    toggleMute,
  } = usePlayerStore();

  const activeRoom = useRoomStore((state) => state.activeRoom);

  // Sync HTML5 audio element with Zustand player state
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn('Playback prevented by browser autoplay policy:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Sync volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Handle time updates from HTML5 audio element
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      updateProgress(audioRef.current.currentTime, audioRef.current.duration || currentTrack?.duration || 0);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#11141c]/95 backdrop-blur-md border-t border-[#232b3d] px-4 py-3 text-white shadow-2xl">
      <audio
        ref={audioRef}
        src={currentTrack.audio_url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          // In room mode, queue system triggers next track
          console.log('[VibeRoom] Track ended');
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Track Information */}
        <div className="flex items-center gap-3 w-full md:w-1/4 min-w-[200px]">
          <div className="relative group">
            <img
              src={currentTrack.cover_url}
              alt={currentTrack.title}
              className={`w-12 h-12 rounded-lg object-cover shadow-md ${isPlaying ? 'ring-2 ring-purple-500/50' : ''}`}
            />
            {isPlaying && (
              <Disc3 className="w-5 h-5 absolute -top-1 -right-1 text-purple-400 animate-spin" />
            )}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold truncate text-gray-100">{currentTrack.title}</h4>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
          {activeRoom && (
            <div className="hidden lg:flex items-center gap-1 text-[11px] bg-purple-950/60 text-purple-300 border border-purple-800/40 px-2 py-0.5 rounded-full ml-2">
              <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
              <span>{activeRoom.name}</span>
            </div>
          )}
        </div>

        {/* Center: Playback Controls & Progress Bar */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>

          <div className="w-full flex items-center gap-2 text-xs text-gray-400">
            <span className="w-10 text-right tabular-nums">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full h-1.5 bg-[#232b3d] rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
            />
            <span className="w-10 tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Volume & Mode controls */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5 text-red-400" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1.5 bg-[#232b3d] rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

