"use client";

import { Heart } from "lucide-react";
export default function LikeButton({
  count = 0,
  size = 15,
  onclick,
}: {
  count?: number | null;
  size?: number;
  onclick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div className="flex items-center gap-1 " onClick={onclick}>
      <Heart size={size} />
      <span>{count}</span>
    </div>
  );
}
