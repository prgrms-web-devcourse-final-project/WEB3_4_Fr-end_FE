"use client";

import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  return (
    <div className="p-4 border-t">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend(value);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="플릿에게 무엇이든 물어보세요"
          className="flex-1 px-4 py-2 rounded-md border h-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button type="submit" className="h-10">
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  );
}
