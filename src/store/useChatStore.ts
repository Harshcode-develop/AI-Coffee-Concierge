import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatMessage } from '../types';

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  toggleChat: () => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hi! I'm Aurora, your AI Coffee Guide. Tell me what flavors you like, or ask for a recommendation based on your mood!",
          timestamp: Date.now(),
        },
      ],
      isOpen: false,
      addMessage: (message) => {
        set({
          messages: [
            ...get().messages,
            {
              ...message,
              id: Math.random().toString(36).substring(7),
              timestamp: Date.now(),
            },
          ],
        });
      },
      toggleChat: () => set({ isOpen: !get().isOpen }),
      clearChat: () => set({ 
        messages: [{
          id: 'welcome',
          role: 'assistant',
          content: "Hi! I'm Aurora, your AI Coffee Guide. Tell me what flavors you like, or ask for a recommendation based on your mood!",
          timestamp: Date.now(),
        }] 
      }),
    }),
    {
      name: 'chat-storage-v2',
    }
  )
);
