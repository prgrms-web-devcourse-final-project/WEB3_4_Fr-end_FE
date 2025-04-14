"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { postLike } from "@/apis/mateBoard/postPostLike";

export default function LikeButtonInfo({ postId }: { postId: number }) {
  const like = async () => {
    try {
      const responese = await postLike(postId);
      console.log("좋아요 게시글 요청:", responese);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="secondary"
      type="submit"
      className="p-5 w-30 text-[16px] cursor-pointer hover:bg-customGray-200 focus:outline-2 "
      onClick={like}
    >
      <Heart />
      <span>좋아요</span>
    </Button>
  );
}
