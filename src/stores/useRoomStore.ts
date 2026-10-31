import { create } from 'zustand';
import type { ChatMessage, LiveReaction, QueueItem, Room, RoomMember } from '../types';

interface RoomState {
  activeRoom: Room | null;
  members: RoomMember[];
  queue: QueueItem[];
  messages: ChatMessage[];
  liveReactions: LiveReaction[];

  // Actions
  setActiveRoom: (room: Room | null) => void;
  setMembers: (members: RoomMember[]) => void;
  setQueue: (queue: QueueItem[]) => void;
  addQueueItem: (item: QueueItem) => void;
  voteQueueItem: (queueItemId: string, userId: string) => void;
  addMessage: (message: ChatMessage) => void;
  addReaction: (reaction: LiveReaction) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  activeRoom: null,
  members: [],
  queue: [],
  messages: [],
  liveReactions: [],

  setActiveRoom: (activeRoom) => set({ activeRoom }),
  setMembers: (members) => set({ members }),
  setQueue: (queue) => set({ queue }),
  addQueueItem: (item) =>
    set((state) => ({
      queue: [...state.queue, item],
    })),
  voteQueueItem: (queueItemId) =>
    set((state) => {
      const updatedQueue = state.queue.map((item) => {
        if (item.id === queueItemId) {
          const hasVoted = item.hasVoted;
          return {
            ...item,
            vote_count: hasVoted ? item.vote_count - 1 : item.vote_count + 1,
            hasVoted: !hasVoted,
          };
        }
        return item;
      });

      // Keep democratic queue sorted by votes (descending)
      updatedQueue.sort((a, b) => b.vote_count - a.vote_count);

      return { queue: updatedQueue };
    }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  addReaction: (reaction) =>
    set((state) => ({
      liveReactions: [...state.liveReactions.slice(-20), reaction], // keep max 20 recent
    })),
}));

