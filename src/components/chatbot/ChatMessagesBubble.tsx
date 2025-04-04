"use client";

import { Button } from "@/components/ui/button";
import { ChatBotMessage } from "@/types/chatbot";
import Image from "next/image";

interface ChatMessageBubbleProps {
  message: ChatBotMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex items-start gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* 👾 챗봇일 경우에만 아바타 + 이름 표시 */}
      {!isUser && (
        <Button className="relative h-12 w-12 rounded-full shadow-2xl cursor-pointer p-2 bg-white">
          <Image
            src="/chat-bot.png" // 📌 public 폴더에 있는 챗봇 아바타 경로
            alt="플릿"
            fill
            className="rounded-full"
          />
        </Button>
      )}

      <div className="flex flex-col space-y-1">
        {/* 이름 (챗봇일 때만 표시) */}
        {!isUser && (
          <span className="text-sm font-semibold text-gray-700 ml-1">
            플릿✨
          </span>
        )}

        {/* 말풍선 */}
        <div
          className={`max-w-[80%] rounded-lg p-3 text-sm ${
            isUser
              ? "bg-primary text-primary-foreground self-end"
              : "bg-muted text-gray-800"
          }`}
        >
          <p>{message.content}</p>
          <span className="text-xs opacity-70 mt-1 block text-right">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
