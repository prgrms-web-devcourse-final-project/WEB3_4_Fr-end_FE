"use client";

import { DialogTitle } from "@/components/ui/dialog";


export function ChatHeader() {
  return (
    <div className="p-4 border-b flex items-center justify-between bg-primary text-primary-foreground rounded-t-lg">
      <DialogTitle className="font-semibold">플릿✨</DialogTitle>
    </div>
  );
}
