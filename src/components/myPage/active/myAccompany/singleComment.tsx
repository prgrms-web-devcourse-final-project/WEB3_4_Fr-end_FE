import Image from "next/image";
import type { UniversalComment } from "@/types/CommentData";
import dayjs from "dayjs";

interface SingleCommentProps {
  comment: UniversalComment;
}

export default function SingleComment({ comment }: SingleCommentProps) {
  const now = dayjs();
  const created = dayjs(comment.date);
  const diffDays = now.diff(created, "day");
  const dateText =
    diffDays > 30
      ? created.format("YYYY.MM.DD")
      : diffDays === 0
      ? "오늘"
      : diffDays === 1
      ? "어제"
      : created.fromNow();

  return (
    <div className="w-[726px] outline outline-customGray-400 rounded-[4px] p-[10px] overflow-hidden mt-4">
      <div className="flex justify-between items-center">
        <div className="text-black text-[24px] font-semibold font-pretendard ml-[4px]">
          {comment.title}
        </div>
      </div>
      <div className="w-[672px] h-[1px] bg-customGray-500 my-[10px] ml-[4px] mr-[30px]" />
      <div className="p-[16px]">
        <div className="flex items-center mb-[15px]">
          <Image
            src={comment.avatar}
            alt="Avatar"
            width={32}
            height={32}
            className="w-[32px] h-[32px] rounded-full"
          />
          <div className="font-medium text-[13px] font-pretendard text-customBlack-700 ml-[8px]">
            {comment.author}
          </div>
          <div className="mx-[8px]">·</div>
          <div className="font-pretendard font-normal text-[13px] text-customBlack-700">
            {dateText}
          </div>
        </div>
        <div className="font-pretendard text-[13px] font-normal text-black line line-clamp-4">
          {comment.content}
        </div>
      </div>
    </div>
  );
}
