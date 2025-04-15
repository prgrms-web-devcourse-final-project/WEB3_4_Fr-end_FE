"use client";
import { Button } from "@/components/ui/button";
import { postLike } from "@/apis/mateBoard/postPostLike";
import { MateDetailData } from "@/types/mateBoard/MateDetailData";
import { useAuthStore } from "@/store/useAuthStore";
import { deletePostLike } from "@/apis/mateBoard/deletePostLike";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LikeButtonInfo({ data }: { data: MateDetailData }) {
  const userId = useAuthStore((state) => state.user?.id);
  const initialLiked =
    data.postLike?.some((like) => like.authorId === userId) ?? false;
  const [liked, setLiked] = useState(initialLiked);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const handleLike = async () => {
    try {
      if (liked) {
        setLiked(false);
        const responese = await deletePostLike(data.matePostId);
        toast.success("게시글 좋아요 취소");
        console.log("좋아요 게시글 취소 요청:", responese.data);
      } else {
        setLiked(true);
        const responese = await postLike(data.matePostId);
        toast.success("게시글 좋아요 성공");
        console.log("좋아요 게시글 요청:", responese.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="secondary"
      type="submit"
      className="p-5 w-30 text-[16px] cursor-pointer hover:bg-customGray-200 focus:outline-2 "
      onClick={handleLike}
    >
      <ThumbsUp />
      <span>{liked ? "추천 취소" : "게시글 추천"}</span>
    </Button>
  );
}
