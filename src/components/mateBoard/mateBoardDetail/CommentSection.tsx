"use client";

import { useState } from "react";
import CommentButton from "@/components/mateBoard/mateBoardDetail/CommentButton";
import CommentCardList from "@/components/mateBoard/mateBoardDetail/CommentCardList";

interface CommentsSectionProps {
  postId: number;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const onCommentPosted = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="space-y-10">
      <CommentButton mateId={postId} onCommentPosted={onCommentPosted} />
      <CommentCardList matePostId={postId} newCommentTrigger={refreshFlag} />
    </div>
  );
}
