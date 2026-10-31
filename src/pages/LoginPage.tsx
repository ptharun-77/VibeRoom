import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Set authenticated user and redirect to dashboard
    setUser({
      id: `usr-${Date.now()}`,
      username: email.split('@')[0] || 'viberoom_listener',
      display_name: email.split('@')[0] || 'VibeRoom Listener',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      bio: 'Ready to discover synchronized soundscapes.',
      created_at: new Date().toISOString(),
    });
    navigate('/');
  };

  const handleDemoLogin = () => {
    setUser({
      id: 'usr_demo_42',
      username: 'vibe_cadet',
      display_name: 'Alex (CSE Student)',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      bio: 'Exploring soundscapes and code flow.',
      created_at: new Date().toISOString(),
    });
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto shadow-xl shadow-purple-600/30">
          <Radio className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome back to VibeRoom</h1>
        <p className="text-xs text-gray-400">Sign in to tune into live listening rooms.</p>
      </div>

      <div className="bg-[#11141c] border border-[#232b3d] rounded-2xl p-6 shadow-2xl space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                required
                placeholder="alex@example.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161b26] border border-[#232b3d] focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Password
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

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold py-2.5 rounded-xl shadow-lg shadow-purple-600/20 transition active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#232b3d]" />
          <span className="flex-shrink mx-3 text-[11px] text-gray-500 uppercase">Or</span>
          <div className="flex-grow border-t border-[#232b3d]" />
        </div>

        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-[#161b26] hover:bg-[#1e2536] text-purple-300 border border-purple-900/40 text-xs font-semibold py-2.5 rounded-xl transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Continue with CSE Student Demo Account</span>
        </button>

        <p className="text-center text-xs text-gray-400 pt-2">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

