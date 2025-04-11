import Image from "next/image";
import { HeartIcon, Trash2Icon } from "lucide-react";
import { MateComment } from "@/types/mateBoard/MateComment";
import { useAuthStore } from "@/store/useAuthStore";
import { timeStamp } from "@/utils/timeStamp";
import { deleteComment } from "@/apis/mateBoard/deleteComment";

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

  const handleDelete = async () => {
    const confirmed = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await deleteComment(matePostId, mateCommentId);
      console.log("댓글 삭제 요청:", response);
      onDelete(mateCommentId);
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
        <div className=" text-xs text-gray-500 mb-5">
          {timeStamp(comment.createdAt)}
        </div>
        <div className="flex gap-2">
          <span className="text-gray-800 text-sm font-semibold -mr-1">
            {comment.likeCount || 0}
          </span>
          <button className="text-gray-400  transition cursor-pointer">
            <HeartIcon className="w-5 h-5 fill-red-500 stroke-0" />
          </button>
          {userId === authorId && (
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
