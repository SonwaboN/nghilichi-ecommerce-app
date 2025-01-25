import React, { useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ChatMessage } from './ChatMessage';
import { useChatStore } from '@/store/chat';

interface ChatWindowProps {
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const { messages, sendMessage, requestLiveAgent, isWaitingForAgent } = useChatStore();
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleLiveAgentRequest = () => {
    requestLiveAgent();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl flex flex-col max-h-[80vh] w-full sm:w-[380px] md:w-[420px] lg:w-[450px]">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-[#777A55] text-white rounded-t-lg">
        <h3 className="font-semibold">Support Chat</h3>
        <button onClick={onClose} className="hover:opacity-75">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Live Agent Request */}
      {!isWaitingForAgent && messages.length > 2 && (
        <div className="px-4 py-2 bg-gray-50 border-t">
          <Button
            onClick={handleLiveAgentRequest}
            variant="secondary"
            className="w-full text-sm"
          >
            Request Live Agent
          </Button>
        </div>
      )}

      {isWaitingForAgent && (
        <div className="px-4 py-2 bg-gray-50 border-t text-sm text-center text-gray-600">
          Waiting for a live agent to join...
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
          />
          <Button type="submit" className="bg-[#777A55] hover:bg-[#777A55]/90">
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};
