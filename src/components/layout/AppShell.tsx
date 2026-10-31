import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { GlobalAudioPlayer } from '../music/GlobalAudioPlayer';
import { CreateRoomModal } from '../../features/rooms/CreateRoomModal';

export const AppShell: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-gray-100 flex flex-col selection:bg-purple-600/30 selection:text-purple-200">
      <Navbar onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      <main className="flex-1 pb-28">
        <Outlet context={{ openCreateModal: () => setIsCreateModalOpen(true) }} />
      </main>

      <GlobalAudioPlayer />

      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

