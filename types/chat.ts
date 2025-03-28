export interface GroupChat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  members: User[];
  unreadCount?: number;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

export interface ChatMessage extends Message {
  sender: User;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
}
