"use client";

import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 locale
import { useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface CommentData {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  avatar: string;
}

interface CommentProps {
  comments: CommentData[];
}

export default function Comment({ comments }: CommentProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const commentPerPage = 3;

  const currentComments = comments.slice(0, currentPage * commentPerPage);
  const totalComments = Math.ceil(comments.length / commentPerPage);

  return (
    <div className="flex flex-col gap-[20px] items-center">
      {currentComments.map((comment) => (
        <div
          key={comment.id}
          className="w-[726px] outline outline-customGray-400 rounded-[4px] p-[10px] overflow-hidden"
        >
          <div className="flex justify-between items-center">
            <div className="text-black text-[24px] font-semibold font-pretendard ml-[4px]">
              {comment.title}
            </div>
            <Image
              src="/icons/trashcan.png"
              alt="trashcan"
              width={13}
              height={16.22}
              className="w-[13px] h-[16.22px] mr-[30px]"
            />
          </div>
          <div className="w-[672px] h-[1px] bg-customGray-500 my-[10px] ml-[4px] mr-[30px]" />
          <div className="w-[688px] max-h-[166px]">
            <div className="p-[16px]">
              <div className="flex items-center mb-[15px]">
                <Image
                  src={`/defaultAvatar/${comment.avatar}`}
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
                  <div className="font-pretendard font-normal text-[13px] text-customBlack-700">
                    {(() => {
                      const now = dayjs();
                      const created = dayjs(comment.date);
                      const diffDays = now.diff(created, "day");

                      if (diffDays > 30) {
                        return created.format("YYYY.MM.DD");
                      } else if (diffDays === 0) {
                        return "오늘";
                      } else if (diffDays === 1) {
                        return "어제";
                      } else {
                        return created.fromNow();
                      }
                    })()}
                  </div>
                </div>
              </div>
              <div
                className="font-pretendard text-[13px] font-normal text-black line"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {comment.content}
              </div>
            </div>
          </div>
        </div>
      ))}
      {currentPage < totalComments && (
        <div
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mb-[113px] hover:bg-customGray-600"
        >
          <div className="text-white text-[13px] font-semibold font-['Pretendard']">
            더보기
          </div>
        </div>
      )}
    </div>
  );
}
