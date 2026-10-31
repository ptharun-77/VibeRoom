import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users,
  Radio,
  ThumbsUp,
  Plus,
  Send,
  Disc3,
  Sparkles,
  Volume2,
  SkipForward,
  Play,
  Pause,
  MessageSquare,
  ListMusic,
  Share2,
  Check,
} from 'lucide-react';
import type { ChatMessage, LiveReaction, QueueItem, Room, Track } from '../types';
import { SAMPLE_TRACKS } from '../assets/sampleTracks';
import { MOOD_CONFIGS } from '../features/mood/moodConfigs';
import { useRoomStore } from '../stores/useRoomStore';
import { usePlayerStore } from '../stores/usePlayerStore';
import { useAuthStore } from '../stores/useAuthStore';
import { formatTime } from '../utils/time';

export const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const user = useAuthStore((state) => state.user);

  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    setCurrentTrack,
  } = usePlayerStore();

  const {
    activeRoom,
    setActiveRoom,
    queue,
    setQueue,
    voteQueueItem,
    addQueueItem,
    messages,
    addMessage,
    liveReactions,
    addReaction,
  } = useRoomStore();

  const [messageInput, setMessageInput] = useState('');
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'queue' | 'chat'>('queue');
  const [copiedInvite, setCopiedInvite] = useState(false);

  // Initialize room state
  useEffect(() => {
    const roomData: Room = {
      id: roomId || 'room-default',
      name: roomId?.includes('focus')
        ? 'Deep Algorithmic Flow'
        : roomId?.includes('chill')
        ? 'Midnight Lo-Fi Loft'
        : 'Community Listening Session',
      description: 'Listening in sync with room members. Vote for what plays next!',
      mood: 'chill',
      genre: 'Lo-Fi / Study',
      is_private: false,
      invite_code: 'VIBE99',
      created_by: 'usr_host',
      created_at: new Date().toISOString(),
      member_count: 14,
      current_track: SAMPLE_TRACKS[0],
      host: {
        id: 'usr_host',
        username: 'dj_vibe',
        display_name: 'DJ Solace (Host)',
        created_at: new Date().toISOString(),
      },
    };

    setActiveRoom(roomData);

    // Initial Democratic Queue
    const initialQueue: QueueItem[] = [
      {
        id: 'q-1',
        room_id: roomData.id,
        track_id: SAMPLE_TRACKS[1].id,
        added_by: 'usr_2',
        status: 'queued',
        vote_count: 5,
        created_at: new Date(Date.now() - 120000).toISOString(),
        track: SAMPLE_TRACKS[1],
        added_by_profile: {
          id: 'usr_2',
          username: 'code_runner',
          display_name: 'CodeRunner',
          created_at: new Date().toISOString(),
        },
        has_voted: false,
      },
      {
        id: 'q-2',
        room_id: roomData.id,
        track_id: SAMPLE_TRACKS[2].id,
        added_by: 'usr_3',
        status: 'queued',
        vote_count: 2,
        created_at: new Date(Date.now() - 60000).toISOString(),
        track: SAMPLE_TRACKS[2],
        added_by_profile: {
          id: 'usr_3',
          username: 'synth_girl',
          display_name: 'SynthGirl',
          created_at: new Date().toISOString(),
        },
        has_voted: false,
      },
    ];
    setQueue(initialQueue);

    // Initial Chat
    if (messages.length === 0) {
      addMessage({
        id: 'msg-1',
        room_id: roomData.id,
        user_id: 'usr_host',
        content: 'Welcome to VibeRoom! Upvote your favorite tracks in the queue 🎵',
        created_at: new Date(Date.now() - 300000).toISOString(),
        profile: roomData.host,
      });
    }

    if (!currentTrack) {
      setCurrentTrack(SAMPLE_TRACKS[0]);
    }
  }, [roomId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      room_id: activeRoom?.id || 'room-default',
      user_id: user?.id || 'anonymous',
      content: messageInput.trim(),
      created_at: new Date().toISOString(),
      profile: user || undefined,
    };

    addMessage(newMsg);
    setMessageInput('');
  };

  const handleSendReaction = (emoji: string) => {
    const reaction: LiveReaction = {
      id: `rx-${Date.now()}-${Math.random()}`,
      room_id: activeRoom?.id || 'room-default',
      user_id: user?.id || 'anonymous',
      emoji,
      created_at: new Date().toISOString(),
    };
    addReaction(reaction);
  };

  const handleAddTrackToQueue = (track: Track) => {
    const newItem: QueueItem = {
      id: `q-${Date.now()}`,
      room_id: activeRoom?.id || 'room-default',
      track_id: track.id,
      added_by: user?.id || 'anonymous',
      status: 'queued',
      vote_count: 1, // Submitter gets 1 default vote
      created_at: new Date().toISOString(),
      track,
      added_by_profile: user || undefined,
      has_voted: true,
    };
    addQueueItem(newItem);
    setIsAddSongModalOpen(false);
  };

  const handleSkipNext = () => {
    if (queue.length > 0) {
      const nextInLine = queue[0];
      if (nextInLine.track) {
        setCurrentTrack(nextInLine.track);
        // Remove from queue
        setQueue(queue.slice(1));
      }
    }
  };

  const handleCopyInvite = () => {
    const invite = activeRoom?.invite_code || 'VIBE99';
    navigator.clipboard?.writeText(invite);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  const moodConfig = activeRoom ? MOOD_CONFIGS[activeRoom.mood] : MOOD_CONFIGS.chill;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      {/* Floating Reactions Canvas */}
      <div className="fixed bottom-24 right-8 pointer-events-none z-30 flex flex-col gap-2 items-end">
        {liveReactions.slice(-6).map((rx) => (
          <div
            key={rx.id}
            className="text-3xl animate-bounce duration-1000 transform transition-all select-none"
          >
            {rx.emoji}
          </div>
        ))}
      </div>

      {/* Room Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#11141c] border border-[#232b3d] p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-700/50 flex items-center justify-center text-purple-300">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{activeRoom?.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#161b26] border border-[#232b3d] text-gray-300 flex items-center gap-1">
                <span>{moodConfig.emoji}</span>
                <span>{moodConfig.label}</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{activeRoom?.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyInvite}
            className="flex items-center gap-1.5 text-xs bg-[#161b26] hover:bg-[#1e2536] text-gray-200 border border-[#232b3d] px-3 py-1.5 rounded-lg transition"
          >
            {copiedInvite ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>Invite: {activeRoom?.invite_code || 'VIBE99'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-950/60 border border-purple-800/40 px-3 py-1.5 rounded-lg">
            <Users className="w-4 h-4" />
            <span>{activeRoom?.member_count || 14} in room</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Player & Stage (Left) | Democratic Queue & Chat (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Stage: Now Playing Vinyl & Host Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#11141c] border border-[#232b3d] rounded-3xl p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-purple-900/10 via-transparent to-transparent pointer-events-none" />

            {/* Rotating Vinyl Disc Artwork */}
            <div className="relative my-4">
              <div
                className={`w-48 h-48 sm:w-60 sm:h-60 rounded-full border-4 border-[#232b3d] shadow-2xl overflow-hidden relative flex items-center justify-center ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '18s' }}
              >
                <img
                  src={currentTrack?.cover_url}
                  alt={currentTrack?.title}
                  className="w-full h-full object-cover"
                />
                <div className="w-12 h-12 rounded-full bg-[#11141c] border-2 border-white/40 absolute z-10 shadow-inner" />
              </div>

              {isPlaying && (
                <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-full shadow-lg">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                </div>
              )}
            </div>

            {/* Track Info */}
            <div className="mt-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">{currentTrack?.title}</h2>
              <p className="text-sm text-purple-400 font-medium mt-1">{currentTrack?.artist}</p>
              <p className="text-xs text-gray-500 mt-0.5">{currentTrack?.album}</p>
            </div>

            {/* Progress & Time */}
            <div className="w-full max-w-md mt-6 space-y-1">
              <div className="w-full bg-[#161b26] h-2 rounded-full overflow-hidden border border-[#232b3d]">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Host DJ Controls */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 transition transform hover:scale-105 active:scale-95"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              <button
                onClick={handleSkipNext}
                className="flex items-center gap-1.5 bg-[#161b26] hover:bg-[#1e2536] text-gray-300 border border-[#232b3d] px-4 py-2.5 rounded-xl text-xs font-semibold transition"
                title="Play next highest-voted track in queue"
              >
                <SkipForward className="w-4 h-4" />
                <span>Next in Queue</span>
              </button>
            </div>

            {/* Live Track Reactions Picker */}
            <div className="mt-8 pt-6 border-t border-[#232b3d] w-full flex flex-col items-center gap-2">
              <span className="text-xs text-gray-400">Tap to react with the room:</span>
              <div className="flex items-center gap-3">
                {['❤️', '🔥', '🎧', '😌', '🙌'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSendReaction(emoji)}
                    className="text-2xl p-2 rounded-xl bg-[#161b26] border border-[#232b3d] hover:border-purple-500 hover:scale-125 transition transform active:scale-95"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Stage: Democratic Queue & Live Chat Tabs */}
        <div className="lg:col-span-5 flex flex-col bg-[#11141c] border border-[#232b3d] rounded-3xl overflow-hidden h-[580px]">
          {/* Tab Selector */}
          <div className="flex border-b border-[#232b3d] bg-[#161b26]/50">
            <button
              onClick={() => setActiveTab('queue')}
              className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition ${
                activeTab === 'queue'
                  ? 'border-b-2 border-purple-500 text-purple-300 bg-purple-600/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ListMusic className="w-4 h-4" />
              <span>Democratic Queue ({queue.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition ${
                activeTab === 'chat'
                  ? 'border-b-2 border-purple-500 text-purple-300 bg-purple-600/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Room Chat ({messages.length})</span>
            </button>
          </div>

          {/* Tab 1: Queue Content */}
          {activeTab === 'queue' && (
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400">Song with highest upvotes plays next.</p>
                <button
                  onClick={() => setIsAddSongModalOpen(true)}
                  className="flex items-center gap-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Suggest Song</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {queue.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-xs">
                    Queue is empty. Be the first to suggest a track!
                  </div>
                ) : (
                  queue.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#161b26] border border-[#232b3d] hover:border-purple-500/30 transition"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-xs font-bold text-gray-500 w-4">{index + 1}</span>
                        {item.track && (
                          <img
                            src={item.track.cover_url}
                            alt={item.track.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div className="overflow-hidden">
                          <p className="text-xs font-semibold text-gray-100 truncate">
                            {item.track?.title}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate">
                            {item.track?.artist} • via {item.added_by_profile?.display_name || 'Member'}
                          </p>
                        </div>
                      </div>

                      {/* Voting Button */}
                      <button
                        onClick={() => voteQueueItem(item.id, user?.id || 'anonymous')}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          item.hasVoted
                            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                            : 'bg-[#11141c] text-gray-300 border border-[#232b3d] hover:border-purple-500'
                        }`}
                        title={item.hasVoted ? 'Remove upvote' : 'Upvote track'}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{item.vote_count}</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Live Chat Content */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((msg) => (
                  <div key={msg.id} className="text-xs flex flex-col">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <span className="font-semibold text-purple-300">
                        {msg.profile?.display_name || 'Listener'}
                      </span>
                      <span className="text-[10px] text-gray-600">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-gray-200 mt-0.5 bg-[#161b26] p-2.5 rounded-xl border border-[#232b3d] leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Chat with listeners..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl px-3 py-2 text-xs text-white outline-none transition"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Suggest Song Modal */}
      {isAddSongModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#11141c] border border-[#232b3d] rounded-2xl w-full max-w-md p-6 shadow-2xl text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base">Suggest a Song to the Room</h3>
              <button
                onClick={() => setIsAddSongModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-400 mb-4">
              Select an authorized sample track to add to the democratic voting queue.
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {SAMPLE_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#161b26] border border-[#232b3d] hover:border-purple-500/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={track.cover_url}
                      alt={track.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold text-gray-200">{track.title}</p>
                      <p className="text-[11px] text-gray-400">{track.artist}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddTrackToQueue(track)}
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

