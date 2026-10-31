import React, { useState } from 'react';
import { User, Sparkles, Radio, ThumbsUp, LogOut, Check } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';

export const ProfilePage: React.FC = () => {
  const { user, setUser, logout } = useAuthStore();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(user?.bio || 'Exploring soundscapes and code flow.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Not Signed In</h2>
        <p className="text-xs text-gray-400">Sign in to customize your profile and track listening activity.</p>
        <button
          onClick={() => {
            setUser({
              id: 'usr_demo_42',
              username: 'vibe_cadet',
              display_name: 'Alex (CSE Student)',
              avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
              bio: 'Exploring soundscapes and code flow.',
              created_at: new Date().toISOString(),
            });
          }}
          className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
        >
          Sign in with Demo Account
        </button>
      </div>
    );
  }

  const handleSaveBio = () => {
    setUser({ ...user, bio: bioText });
    setIsEditingBio(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Profile Card Header */}
      <div className="bg-[#11141c] border border-[#232b3d] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="relative">
          <img
            src={user.avatar_url}
            alt={user.display_name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-500/50 shadow-xl"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#11141c]" />
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{user.display_name}</h1>
            <span className="text-xs text-purple-400 font-mono">@{user.username}</span>
          </div>

          {isEditingBio ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                className="w-full bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl p-2.5 text-xs text-white outline-none"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveBio}
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-lg transition"
                >
                  Save Bio
                </button>
                <button
                  onClick={() => setIsEditingBio(false)}
                  className="bg-[#161b26] text-gray-400 text-xs px-3 py-1 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p
              onClick={() => setIsEditingBio(true)}
              className="text-xs text-gray-400 cursor-pointer hover:text-gray-300 transition"
              title="Click to edit bio"
            >
              {user.bio || 'Add a bio...'}
            </p>
          )}

          {savedSuccess && (
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
              <Check className="w-3.5 h-3.5" />
              <span>Bio updated successfully!</span>
            </p>
          )}
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-950/30 border border-red-900/40 px-3 py-2 rounded-xl transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Member Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#11141c] border border-[#232b3d] p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Rooms Tuned Into</p>
            <p className="text-2xl font-bold text-white">18</p>
          </div>
        </div>

        <div className="bg-[#11141c] border border-[#232b3d] p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Democratic Votes Cast</p>
            <p className="text-2xl font-bold text-white">47</p>
          </div>
        </div>

        <div className="bg-[#11141c] border border-[#232b3d] p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Favorite Mood</p>
            <p className="text-2xl font-bold text-white">Chill 🌙</p>
          </div>
        </div>
      </div>
    </div>
  );
};

