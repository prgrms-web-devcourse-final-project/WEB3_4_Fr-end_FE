"use client";

import { useEffect, useRef } from "react";
import { ChatBotMessage } from "@/types/ChatBot";
import { ChatMessageBubble } from "@/components/chatbot/ChatMessagesBubble";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface ChatMessagesProps {
  messages: ChatBotMessage[];
  isTyping: boolean;
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const chatRef = useRef<HTMLDivElement>(null);
  let lastDate: string | null = null;

  // 새 메시지 생기면 스크롤 맨 아래로
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const messageDate = format(
          new Date(Date.now()), // 채팅창 상단 날짜표시시
          "yyyy년 MM월 dd일 EEEE",
          { locale: ko }
        );

        const showDate = messageDate !== lastDate;
        lastDate = messageDate;

        return (
          <div key={message.id} className="space-y-2">
            {showDate && (
              <div className="text-center text-sm text-gray-500">
                {messageDate}
              </div>
            )}
            <ChatMessageBubble message={message} />
          </div>
        );
      })}

      {isTyping && (
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="animate-bounce">●</div>
          <div className="animate-bounce delay-100">●</div>
          <div className="animate-bounce delay-200">●</div>
        </div>
      )}
    </div>
  );
}
