"use client";

import { postComment } from "@/apis/mateBoard/postComment";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";

export default function CommentButton({
  mateId,
  onCommentPosted,
}: {
  mateId: number;
  onCommentPosted: () => void;
}) {
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedComment = comment.trimEnd();
    if (!trimmedComment) {
      setErrorMessage("댓글을 입력해 주세요.");
      return;
    }
    if (trimmedComment.length < 5) {
      setErrorMessage("댓글은 최소 5자 이상이어야 합니다.");
      return;
    }

    setErrorMessage("");

    try {
      await postComment(mateId, { content: comment });
      setComment("");
      onCommentPosted();
    } catch (error) {
      console.log(error);
      alert("댓글 전송에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="">
      <div className="space-y-3">
        {/* 입력창 박스 */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border border-customGray-700 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="댓글을 작성해 주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-customGray-700 placeholder:text-gray-400"
            />

            <button type="submit" className="text-gray-500 hover:text-gray-800">
              <PaperPlaneIcon />
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 font-bold text-sm mt-1">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
