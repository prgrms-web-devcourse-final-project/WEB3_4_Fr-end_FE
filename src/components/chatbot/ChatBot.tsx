"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatBotMessage } from "@/types/chatbot";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatBotMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const createChatRoom = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return;

        const res = await fetch(
          "http://api.sete.kr:8080/api/v1/chatBot/chat/rooms",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
            body: JSON.stringify({}),
          }
        );

        if (!res.ok) throw new Error();

        const data = await res.json();
        setChatRoomId(data.id);

        const storedUserData = localStorage.getItem("UserData");
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        const nickname = userData?.nickname || "고객";

        const welcome: ChatBotMessage = {
          id: Date.now().toString(),
          content: `안녕하세요! ${nickname}님. 어떤 게 궁금하신가요? 💡`,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages([welcome]);
      } catch (err) {
        console.error(err);
      }
    };

    createChatRoom();
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !chatRoomId) return;

    const userMessage: ChatBotMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await fetch(
        `http://api.sete.kr:8080/api/v1/chatBot/chat/rooms/${chatRoomId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
          body: JSON.stringify({ userMessage: message }),
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      const botMessage: ChatBotMessage = {
        id: (Date.now() + 1).toString(),
        content: data.botMessage ?? "🤖 답변이 없습니다.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "❌ 오류가 발생했어요. 다시 시도해주세요.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
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

        <div className="absolute bottom-full mb-3 right-1/2 translate-x-1/2 hidden group-hover:flex flex-col items-center">
          <div className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-md whitespace-nowrap w-auto">
            챗봇과 대화해보세요
          </div>
          <div className="w-2 h-2 bg-gray-800 rotate-45 mt-[-4px]" />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
          <ChatHeader />
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
