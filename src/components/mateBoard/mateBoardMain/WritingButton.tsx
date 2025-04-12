"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

export default function WritingButton() {
  const { accessToken } = useAuthStore();
  if (!accessToken) return null;

  return (
    <div>
      <Link href="mateBoard/write">
        <Button className="cursor-pointer hover:bg-customGray-700">
          글 작성
        </Button>
      </Link>
    </div>
  );
}
