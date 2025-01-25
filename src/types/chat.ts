export interface Message {
  content: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isWaitingForAgent: boolean;
}
