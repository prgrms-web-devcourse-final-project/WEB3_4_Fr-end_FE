"use client";

import { PostLike } from "@/types/mateBoard/MateCardData";
import { ThumbsUp } from "lucide-react";
import { postLike } from "@/apis/mateBoard/postPostLike";
import { deletePostLike } from "@/apis/mateBoard/deletePostLike";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LikeButton({
  count,
  size = 15,
  matePostId,
  postLikeData,
}: {
  count?: number | null;
  size?: number;
  matePostId: number;
  postLikeData: PostLike[];
}) {
  const userId = useAuthStore((state) => state.user?.id);
  const initialLiked =
    postLikeData?.some((like) => like.authorId === userId) ?? false;
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(count ?? 0);

  useEffect(() => {
    const newLiked =
      postLikeData?.some((like) => like.authorId === userId) ?? false;
    setLiked(newLiked);
  }, [postLikeData, userId]);

  useEffect(() => {
    setLikeCount(count ?? 0);
  }, [count]);

  const handleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const previousLiked = liked;
    const previousCount = likeCount;

    try {
      if (liked) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
        const responese = await deletePostLike(matePostId);
        toast.success("게시글 좋아요 취소");
        console.log("좋아요 게시글 취소 요청:", responese.data);
      } else {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
        const responese = await postLike(matePostId);
        toast.success("게시글 좋아요 성공");
        console.log("좋아요 게시글 요청:", responese.data);
      }
    } catch (error) {
      setLiked(previousLiked);
      setLikeCount(previousCount);
      console.error(error);
    }
  };
  return (
    <div className="flex items-center gap-1 " onClick={handleLike}>
      <ThumbsUp size={size} {...(liked ? { fill: "black" } : {})} />
      <span>{likeCount}</span>
    </div>
  );
}
