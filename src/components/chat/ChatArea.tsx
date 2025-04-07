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
  // 추가 샘플 메시지
];

export function ChatArea({ selectedChat }: ChatAreaProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  // 채팅 메시지 영역에 대한 ref
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 메시지가 업데이트될 때마다 채팅 영역의 scrollTop을 최신 높이로 설정하여 자동 스크롤
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
      {/* 채팅 메시지 영역에 ref를 지정하고, overflow-y-auto로 스크롤 가능하게 함 */}
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
