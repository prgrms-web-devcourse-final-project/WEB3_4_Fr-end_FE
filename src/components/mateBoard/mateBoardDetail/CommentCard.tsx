import Image from "next/image";
import { HeartIcon, Trash2Icon } from "lucide-react";
import { MateComment } from "@/types/mateBoard/MateComment";

export default function CommentCard({ comment }: { comment: MateComment }) {
  return (
    <div className="bg-customGray-100 rounded-2xl p-6 drop-shadow-xl">
      {/* // 좋아요,삭제 버튼 */}
      <div className="absolute top-4 right-4 flex gap-2 my-7">
        <span className="text-gray-800 text-sm font-semibold -mr-1">
          {comment.likeCount || 0}
        </span>
        <button className="text-gray-400  transition">
          <HeartIcon className="w-5 h-5 fill-red-500 stroke-0" />
        </button>
        <button className="text-gray-400 hover:text-gray-600 transition">
          <Trash2Icon className="w-5 h-5" />
        </button>
      </div>
      {/* 상단: 프로필 영역 */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
          <Image
            src={comment.profileImage || "/default-profile.png"}
            alt="프로필"
            className="rounded-full"
            width={48}
            height={48}
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
    </div>
  );
}
