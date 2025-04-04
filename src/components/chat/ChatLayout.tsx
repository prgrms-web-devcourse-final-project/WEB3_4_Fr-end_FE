"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";
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
    <div className="flex h-170 bg-white gap-x-5">
      <ChatSidebar
        chats={sampleChats}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <ChatArea selectedChat={selectedChat} />
    </div>
  );
}
