"use client";

import { useState } from "react";
import { GroupChat, ChatMessage } from "@/types/chat";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageInput } from "@/components/chat/MessageInput";
import Image from "next/image";

interface ChatAreaProps {
  selectedChat: GroupChat | null;
}

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Hey team! How's the progress?",
    sender: {
      id: "1",
      name: "Alice",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      status: "online",
    },
    timestamp: "10:00 AM",
    status: "read",
  },
  // Add more sample messages
];

export function ChatArea({ selectedChat }: ChatAreaProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader chat={selectedChat} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${
              message.sender.id === "1"
                ? "flex-row-reverse space-x-reverse"
                : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={message.sender.avatar}
                alt={message.sender.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div
              className={`flex flex-col ${
                message.sender.id === "1" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-md ${
                  message.sender.id === "1"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-gray-100 rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
      <MessageInput
        onSendMessage={(content) => {
          setMessages([
            ...messages,
            {
              id: Date.now().toString(),
              content,
              sender: {
                id: "1",
                name: "You",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                status: "online",
              },
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              status: "sent",
            },
          ]);
        }}
      />
    </div>
  );
}
