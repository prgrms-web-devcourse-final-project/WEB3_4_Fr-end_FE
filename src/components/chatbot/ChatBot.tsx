"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatBotMessage } from "@/types/chatbot";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatBotMessage[]>([
    {
      id: "1",
      content:
        "안녕하세요! 배채연님.저는 ‘플릿’이에요! 당신의 질문을 기다리고있어요! 어떤게 궁금하신가요? 💡",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatBotMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: ChatBotMessage = {
        id: (Date.now() + 1).toString(),
        content: "저는 테스트 버전이에요!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* 챗봇 아이콘 버튼 + 툴팁 */}
      <div className="fixed bottom-16 right-15 group z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative h-24 w-24 rounded-full shadow-2xl cursor-pointer p-2 bg-white"
        >
          <Image
            src="/chat-bot.png"
            alt="채팅 아이콘"
            fill
            className="object-contain"
          />
        </Button>

        {/* 툴팁 - 말풍선 */}
        <div className="absolute bottom-full mb-3 right-1/2 translate-x-1/2 hidden group-hover:flex flex-col items-center">
          <div className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-md whitespace-nowrap w-auto">
            챗봇과 대화해보세요
          </div>
          <div className="w-2 h-2 bg-gray-800 rotate-45 mt-[-4px]" />
        </div>
      </div>

      {/* 챗봇 다이얼로그 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <ChatMessages messages={messages} isTyping={isTyping} />
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSendMessage}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
