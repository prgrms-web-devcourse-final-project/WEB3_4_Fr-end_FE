"use client";

import { useState, useEffect } from "react";
import CommentCard from "@/components/mateBoard/mateBoardDetail/CommentCard";
import { getComments } from "@/apis/mateBoard/getComments";
import { MateComment } from "@/types/mateBoard/MateComment";

export default function CommentCardList({
  matePostId,
  newCommentTrigger,
}: {
  matePostId: number;
  newCommentTrigger: boolean;
}) {
  const [comments, setComments] = useState<MateComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleCommentDelete = (deletedCommentId: number) => {
    setComments((prevComments) =>
      prevComments.filter(
        (comment) => comment.mateCommentId !== deletedCommentId
      )
    );
  };

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await getComments(matePostId);
        console.log("API에서 반환된 댓글 데이터:", response);
        setComments(response.data);
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
        setError("댓글을 불러오는 중입니다");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [matePostId, newCommentTrigger]);

  if (loading) return <div>댓글 로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.mateCommentId} comment={comment} onDelete={handleCommentDelete} />
        ))
      ) : (
        <div>댓글이 없습니다.</div>
      )}
    </div>
  );
}
