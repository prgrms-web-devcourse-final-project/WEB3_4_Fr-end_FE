"use client";

import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatArea } from "./ChatArea";
import { GroupChat } from "@/types/chat";

const sampleChats: GroupChat[] = [
  {
    id: "1",
    name: "Project Team",
    lastMessage: "Great work everyone!",
    timestamp: "10:30 AM",
    members: [
      {
        id: "1",
        name: "Alice",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        status: "online",
      },
      {
        id: "2",
        name: "Bob",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
        status: "offline",
      },
    ],
    unreadCount: 3,
  },
  // Add more sample chats as needed
];

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<GroupChat | null>(null);

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar
        chats={sampleChats}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <ChatArea selectedChat={selectedChat} />
    </div>
  );
}
