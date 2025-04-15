"use client";

import { HeartIcon } from "lucide-react";
import { CommentLikeType } from "@/types/mateBoard/MateComment";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { postCommentLike } from "@/apis/mateBoard/postCommentLike";
import { deleteCommentLike } from "@/apis/mateBoard/deleteCommentLike";
import toast from "react-hot-toast";

export default function CommentLike({
  commentLikeData,
  postId,
  commentId,
}: {
  commentLikeData: CommentLikeType[];
  postId: number;
  commentId: number;
}) {
  const userId = useAuthStore((state) => state.user?.id);
  const initialLiked =
    commentLikeData?.some((like) => like.authorId === userId) ?? false;
  const initialLikeCount = commentLikeData?.length ?? 0;
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const handleLike = async () => {
    const previousLiked = liked;
    const previousCount = likeCount;

    try {
      if (liked) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
        const responese = await deleteCommentLike(postId, commentId);
        toast.success("댓글 좋아요 취소");
        console.log("댓글 좋아요 취소 요청:", responese.data);
      } else {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
        const responese = await postCommentLike(postId, commentId);
        toast.success("댓글 좋아요");
        console.log("댓글 좋아요 요청:", responese.data);
      }
    } catch (error) {
      setLikeCount(previousCount);
      setLiked(previousLiked);
      console.error(error);
    }
  };

  return (
    <>
      <span className="text-gray-800 text-sm font-semibold -mr-1">
        {likeCount}
      </span>
      <button
        className="text-gray-400  transition cursor-pointer"
        onClick={handleLike}
      >
        <HeartIcon
          className={`w-5 h-5 ${liked ? "fill-red-500 stroke-0" : ""}`}
        />
      </button>
    </>
  );
}
