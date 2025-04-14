"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { GroupChat } from "@/types/Chat";

const sampleChats: GroupChat[] = [
  {
    id: "1",
    name: "Project Team",
    lastMessage: "대단하십니다!",
    timestamp: "10:30 AM",
    members: [
      {
        id: "1",
        name: "채연",
        avatar: "/defaultAvatar/60.png",
        status: "online",
      },
      {
        id: "2",
        name: "지환",
        avatar: "/defaultAvatar/avatar1.png",
        status: "offline",
      },
      {
        id: "3",
        name: "윤호",
        avatar: "/defaultAvatar/avrtar3.png",
        status: "offline",
      },
      {
        id: "4",
        name: "석준",
        avatar: "/defaultAvatar/45.png",
        status: "offline",
      },
    ],
    unreadCount: 3,
  },
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
