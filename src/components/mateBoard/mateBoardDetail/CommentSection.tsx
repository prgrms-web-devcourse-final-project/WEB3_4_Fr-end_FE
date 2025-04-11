"use client";

import { useState } from "react";
import CommentButton from "@/components/mateBoard/mateBoardDetail/CommentButton";
import CommentCardList from "@/components/mateBoard/mateBoardDetail/CommentCardList";

interface CommentsSectionProps {
  matePostId: number;
}

export default function CommentsSection({ matePostId }: CommentsSectionProps) {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const onCommentPosted = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="space-y-10">
      <CommentButton mateId={matePostId} onCommentPosted={onCommentPosted} />
      <CommentCardList
        matePostId={matePostId}
        newCommentTrigger={refreshFlag}
      />
    </div>
  );
}
