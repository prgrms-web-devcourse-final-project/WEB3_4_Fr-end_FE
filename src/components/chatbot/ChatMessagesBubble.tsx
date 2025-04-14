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
    <div className={`flex flex-col gap-1 w-full ${isUser ? "items-end" : "items-start"}`}>
      <div className="flex items-start gap-2">
        {!isUser && (
          <Button className="relative h-12 w-12 rounded-full shadow-2xl cursor-pointer p-2 bg-white shrink-0">
            <Image
              src="/chat-bot.png"
              alt="플릿"
              fill
              className="rounded-full"
            />
          </Button>
        )}

        <div
          className={`
            w-fit max-w-full rounded-lg p-3 text-sm break-words whitespace-normal
            ${isUser ? "bg-primary text-primary-foreground" : "bg-muted text-gray-800"}
          `}
          style={{ display: "inline-block" }}
        >
          {message.content}
        </div>
      </div>

      <span
        className={`
          text-xs opacity-70 text-gray-500 mt-1
          ${isUser ? "text-right mr-3" : "text-left ml-[52px]"}
        `}
      >
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}
