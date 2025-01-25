import { create } from 'zustand';
import { Message } from '@/types/chat';

interface ChatStore {
  messages: Message[];
  isWaitingForAgent: boolean;
  sendMessage: (content: string) => void;
  requestLiveAgent: () => void;
}

const INITIAL_MESSAGE: Message = {
  content: "Hello! I'm your support assistant. How can I help you today?",
  sender: 'bot',
  timestamp: new Date(),
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [INITIAL_MESSAGE],
  isWaitingForAgent: false,

  sendMessage: (content) => {
    set((state) => ({
      messages: [
        ...state.messages,
        { content, sender: 'user', timestamp: new Date() },
      ],
    }));

    // Simulate bot response
    setTimeout(() => {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            content: "I understand you need help. I'll do my best to assist you. If you need more specific help, you can request a live agent.",
            sender: 'bot',
            timestamp: new Date(),
          },
        ],
      }));
    }, 1000);
  },

  requestLiveAgent: () => {
    set((state) => ({
      isWaitingForAgent: true,
      messages: [
        ...state.messages,
        {
          content: "I'm connecting you with a live agent. Please wait a moment...",
          sender: 'bot',
          timestamp: new Date(),
        },
      ],
    }));
  },
}));
