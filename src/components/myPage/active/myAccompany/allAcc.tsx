"use client";

import { CommentData } from "@/types/CommentData";
import { MateData } from "@/types/mateBoard/MateData";
import SingleComment from "./singleComment";
import { useState } from "react";

interface AccProps {
  users: MateData[];
  comments: CommentData[];
}

export default function AllAcc({ users, comments }: AccProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleUsers = users.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="mt-[30px] flex flex-col gap-6 items-center">
      {visibleUsers.map((user, index) => (
        <div key={user.id}>
          <div className="flex justify-between w-[726px] bg-customGray-200 rounded-[8px] p-3">
            <div className="flex gap-2">
              <div className="font-semibold">{user.nickname}</div>
              <p>님이 동행신청을 했습니다! 수락하시겠습니까?</p>
            </div>
            <div className="flex gap-3">
              <button>✅</button>
              <button>❌</button>
            </div>
          </div>

          {/* 댓글이 있다면 보여줌 */}
          {comments[index] && <SingleComment comment={comments[index]} />}
        </div>
      ))}

      {visibleCount < users.length && (
        <div
          onClick={handleShowMore}
          className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mb-[113px] hover:bg-customGray-600"
        >
          <div className="text-white text-[13px] font-semibold font-pretendard">
            더보기
          </div>
        </div>
      )}
    </div>
  );
}
