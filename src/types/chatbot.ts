export interface ChatBotMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatState {
  isOpen: boolean;
  messages: ChatBotMessage[];
  isTyping: boolean;
}
