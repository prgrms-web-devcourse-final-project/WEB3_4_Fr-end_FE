"use client";

import { useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-indigo-300 rounded-b-2xl bg-white"
    >
      <div className="flex space-x-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메세지를 입력하세요."
          className="flex-1 resize-none rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 min-h-[44px] max-h-32"
          rows={1}
          style={{
            height: "auto",
            minHeight: "44px",
            maxHeight: "128px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PaperPlaneIcon />
        </button>
      </div>
    </form>
  );
}
