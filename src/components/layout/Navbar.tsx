import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radio, Compass, Sparkles, Library, PlusCircle, User } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';

interface NavbarProps {
  onOpenCreateModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCreateModal }) => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const navLinks = [
    { to: '/', label: 'Home', icon: Radio },
    { to: '/discover', label: 'Discover', icon: Compass },
    { to: '/moods', label: 'Moods', icon: Sparkles },
    { to: '/library', label: 'Library', icon: Library },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#0a0c10]/90 backdrop-blur-md border-b border-[#232b3d] px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:scale-105 transition">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-white via-gray-100 to-purple-300 bg-clip-text text-transparent">
              VibeRoom
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-800/50 text-purple-300">
              Sync
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#11141c] p-1 rounded-xl border border-[#232b3d]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {onOpenCreateModal && (
            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-lg shadow-md hover:shadow-purple-500/20 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Room</span>
            </button>
          )}

          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-purple-500/50 transition"
              title={`${user.display_name} (@${user.username})`}
            >
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.display_name}
                  className="w-8 h-8 rounded-full object-cover border border-[#232b3d]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-700/50 flex items-center justify-center text-purple-200 text-xs font-bold">
                  {user.display_name.charAt(0)}
                </div>
              )}
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-[#161b26] border border-[#232b3d] px-3 py-1.5 rounded-lg transition"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

