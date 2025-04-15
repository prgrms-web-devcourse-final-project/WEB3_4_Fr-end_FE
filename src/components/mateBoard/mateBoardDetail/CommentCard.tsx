"use client";

import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { MateComment } from "@/types/mateBoard/MateComment";
import { useAuthStore } from "@/store/useAuthStore";
import { timeStamp } from "@/utils/timeStamp";
import { deleteComment } from "@/apis/mateBoard/deleteComment";
import ConfirmModal from "@/components/mateBoard/common/ConfirmModal";
import { useState } from "react";
import CommentLike from "@/components/mateBoard/mateBoardDetail/CommentLike";

export default function CommentCard({
  comment,
  onDelete,
}: {
  comment: MateComment;
  onDelete: (mateCommentId: number) => void;
}) {
  const userId = useAuthStore((state) => state.user?.id);
  const authorId = comment.authorId;
  const { matePostId, mateCommentId } = comment;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleModalOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalPosition({ x: e.clientX, y: e.clientY });
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteComment(matePostId, mateCommentId);
      console.log("댓글 삭제 요청:", response);
      onDelete(mateCommentId);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row justify-between bg-customGray-100 rounded-2xl p-6 drop-shadow-xl relative">
      {/* 프로필 영역 */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
          <Image
            src={comment.profileImageUrl || "/default-profile.png"}
            alt="프로필"
            fill
            className="rounded-full object-center object-cover"
          />
        </div>
        <div className="space-y-2">
          <div className="text-[16px] font-semibold text-customBlack-200">
            {comment.nickname}
          </div>
          <div className="text-[16px] text-customGray-600">
            {comment.content}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <div className=" text-xs text-gray-500 mb-2">
          <span>{timeStamp(comment.createdAt)}</span>
        </div>

        <div className="flex gap-2">
          <CommentLike
            commentLikeData={comment.commentLike}
            postId={matePostId}
            commentId={comment.mateCommentId}
          />
          {userId === authorId && (
            <button
              onClick={handleModalOpen}
              className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      {isModalOpen && modalPosition && (
        <ConfirmModal
          message="정말로 댓글을 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
          position={modalPosition}
        />
      )}
    </div>
  );
}
