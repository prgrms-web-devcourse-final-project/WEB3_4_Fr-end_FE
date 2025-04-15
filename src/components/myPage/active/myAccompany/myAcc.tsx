"use client";

import SingleComment from "./singleComment";
import { useState } from "react";
import { MateApplication } from "@/types/myPage/MateApplication";

interface Props {
  applications: MateApplication[];
}

export default function MyAcc({ applications }: Props) {
  const [visiblePendingCount, setVisiblePendingCount] = useState(5);
  const [visibleAcceptedCount, setVisibleAcceptedCount] = useState(5);
  const [visibleRejectedCount, setVisibleRejectedCount] = useState(5);

  const pending = applications.filter((a) => a.status === "PENDING");
  const accepted = applications.filter((a) => a.status === "ACCEPTED");
  const rejected = applications.filter((a) => a.status === "REJECTED");

  return (
    <div className="mt-[30px] flex flex-col gap-12 items-center w-full">
      {pending.length > 0 && (
        <section className="flex flex-col gap-6 items-center w-full">
          <h3 className="w-[726px] text-left font-bold text-[16px]">
            🕓 대기 중인 신청
          </h3>
          {pending.slice(0, visiblePendingCount).map((user, i) => (
            <div key={`pending-${i}`}>
              <div className="flex justify-between w-[726px] bg-customGray-200 rounded-[8px] p-3">
                <div className="flex gap-2">
                  <div className="font-semibold">{user.writerNickname}</div>
                  <p>님에게 동행신청을 했습니다!</p>
                </div>
              </div>
              <SingleComment
                comment={{
                  title: user.mateTitle,
                  content: user.mateContentPreview,
                  author: user.writerNickname ?? "익명",
                  avatar: user.writerProfileImage || "/defaultAvatar/31.png",
                  date: new Date().toISOString(),
                }}
              />
            </div>
          ))}

          {visiblePendingCount < pending.length && (
            <div
              onClick={() => setVisiblePendingCount((prev) => prev + 5)}
              className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] hover:bg-customGray-600"
            >
              <div className="text-white text-[13px] font-semibold font-pretendard">
                더보기
              </div>
            </div>
          )}
        </section>
      )}

      {accepted.length > 0 && (
        <section className="flex flex-col gap-6 items-center w-full">
          <h3 className="w-[726px] text-left font-bold text-[16px]">
            ✅ 수락된 신청
          </h3>
          {accepted.slice(0, visibleAcceptedCount).map((user, i) => (
            <SingleComment
              key={`accepted-${i}`}
              comment={{
                title: user.mateTitle,
                content: user.mateContentPreview,
                author: user.writerNickname ?? "익명",
                avatar: user.writerProfileImage || "/defaultAvatar/31.png",
                date: new Date().toISOString(),
              }}
            />
          ))}

          {visibleAcceptedCount < accepted.length && (
            <div
              onClick={() => setVisibleAcceptedCount((prev) => prev + 5)}
              className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] hover:bg-customGray-600"
            >
              <div className="text-white text-[13px] font-semibold font-pretendard">
                더보기
              </div>
            </div>
          )}
        </section>
      )}

      {rejected.length > 0 && (
        <section className="flex flex-col gap-6 items-center w-full">
          <h3 className="w-[726px] text-left font-bold text-[16px]">
            ❌ 거절된 신청
          </h3>
          {rejected.slice(0, visibleRejectedCount).map((user, i) => (
            <SingleComment
              key={`rejected-${i}`}
              comment={{
                title: user.mateTitle,
                content: user.mateContentPreview,
                author: user.writerNickname ?? "익명",
                avatar: user.writerProfileImage || "/defaultAvatar/31.png",
                date: new Date().toISOString(),
              }}
            />
          ))}

          {visibleRejectedCount < rejected.length && (
            <div
              onClick={() => setVisibleRejectedCount((prev) => prev + 5)}
              className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mb-[113px] hover:bg-customGray-600"
            >
              <div className="text-white text-[13px] font-semibold font-pretendard">
                더보기
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
