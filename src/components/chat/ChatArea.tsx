"use client";

import { useState, useRef, useEffect } from "react";
import { GroupChat, ChatMessage } from "@/types/Chat";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageInput } from "@/components/chat/MessageInput";
import Image from "next/image";

interface ChatAreaProps {
  selectedChat: GroupChat | null;
}

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    content: "안녕하세요! 모두들 반갑습니다!",
    sender: {
      id: "1",
      name: "채연",
      avatar: "/defaultAvatar/60.png",
      status: "online",
    },
    timestamp: "10:00 AM",
    status: "read",
  },
  {
    id: "2",
    content: "프로젝트하느라 수고 많으셨어요!",
    sender: {
      id: "2",
      name: "윤호",
      avatar: "/defaultAvatar/avrtar3.png",
      status: "online",
    },
    timestamp: "10:03 AM",
    status: "read",
  },
  {
    id: "3",
    content: "오늘 끝나고 소주 한잔씩들 하십니까?",
    sender: {
      id: "3",
      name: "지환",
      avatar: "/defaultAvatar/avatar1.png",
      status: "online",
    },
    timestamp: "10:04 AM",
    status: "read",
  },
  {
    id: "4",
    content: "피곤합니다",
    sender: {
      id: "4",
      name: "윤호",
      avatar: "/defaultAvatar/avrtar3.png",
      status: "online",
    },
    timestamp: "10:10 AM",
    status: "read",
  },
  {
    id: "5",
    content: "저는 이미 마시고 있어요! 낮술이 좋더라구요",
    sender: {
      id: "5",
      name: "석준",
      avatar: "/defaultAvatar/45.png",
      status: "online",
    },
    timestamp: "10:15 AM",
    status: "read",
  },
  {
    id: "6",
    content: "대단하십니다!",
    sender: {
      id: "1",
      name: "채연",
      avatar: "/defaultAvatar/60.png",
      status: "online",
    },
    timestamp: "10:30 AM",
    status: "read",
  },
];

export function ChatArea({ selectedChat }: ChatAreaProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-indigo-300">
        <p className="text-gray-500">채팅방을 선택해 주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col rounded-2xl border border-indigo-300">
      <ChatHeader chat={selectedChat} />
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
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
                    ? "bg-indigo-400 text-white rounded-sm"
                    : "bg-white border border-indigo-400 rounded-sm"
                }`}
              >
                <p
                  className={`text-sm ${
                    message.sender.id === "1" ? "text-white" : "text-indigo-400"
                  }`}
                >
                  {message.content}
                </p>
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
                avatar: "/defaultAvatar/60.png",
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
