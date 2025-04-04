"use client";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";
import Image from "next/image";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex items-center justify-between bg-primary text-primary-foreground ">
      <Image src="/logo-white.png" alt="logo-white" width={80} height={80} />
      <DialogTitle className="font-semibold text-center">플릿✨</DialogTitle>
      <Button
        variant="ghost"
        size="icon"
        className="text-primary-foreground hover:bg-transparent hover:text-primary-foreground cursor-pointer"
        onClick={onClose}
      >
        ×
      </Button>
    </div>
  );
}
