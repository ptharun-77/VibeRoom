import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, Lock, Mail, User, Sparkles } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { ALL_MOODS } from '../features/mood/moodConfigs';
import type { MoodType } from '../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteMood, setFavoriteMood] = useState<MoodType>('chill');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: `usr-${Date.now()}`,
      username: username.trim().toLowerCase(),
      display_name: displayName.trim() || username.trim(),
      avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
      bio: `Favorite mood: ${favoriteMood}. Joined VibeRoom to listen together.`,
      created_at: new Date().toISOString(),
    });
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto shadow-xl shadow-purple-600/30">
          <Radio className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Join VibeRoom</h1>
        <p className="text-xs text-gray-400">Create an account to start and join synchronized rooms.</p>
      </div>

      <div className="bg-[#11141c] border border-[#232b3d] rounded-2xl p-6 shadow-2xl space-y-4">
        <form onSubmit={handleRegister} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Username *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                required
                placeholder="soundwave99"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Display Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maya Lin"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl px-3.5 py-2 text-xs text-white outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                required
                placeholder="maya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Default Listening Frequency / Mood
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {ALL_MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setFavoriteMood(m.id)}
                  className={`p-1.5 rounded-xl border text-[11px] font-medium flex flex-col items-center justify-center transition ${
                    favoriteMood === m.id
                      ? 'bg-purple-600/30 border-purple-500 text-white'
                      : 'bg-[#161b26] border-[#232b3d] text-gray-400'
                  }`}
                >
                  <span>{m.emoji}</span>
                  <span className="truncate w-full text-center mt-0.5">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold py-2.5 rounded-xl shadow-lg shadow-purple-600/20 transition active:scale-[0.98] mt-2"
          >
            Create VibeRoom Account
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 pt-1">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

