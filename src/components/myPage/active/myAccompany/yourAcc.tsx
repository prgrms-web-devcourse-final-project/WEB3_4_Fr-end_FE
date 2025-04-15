"use client";

import SingleComment from "./singleComment";
import { useState } from "react";
import { MateApplication } from "@/types/myPage/MateApplication";
import { acceptAccompany } from "@/lib/myPage/accompanyAccept";
import { rejectAccompany } from "@/lib/myPage/accompanyReject";
import toast from "react-hot-toast";

interface Props {
  applications: MateApplication[];
  onChanged?: () => void;
}

export default function YourAcc({ applications, onChanged }: Props) {
  const [visiblePendingCount, setVisiblePendingCount] = useState(3);
  const [visibleAcceptedCount, setVisibleAcceptedCount] = useState(3);
  const [visibleRejectedCount, setVisibleRejectedCount] = useState(3);

  const pending = applications.filter((a) => a.status === "PENDING");
  const accepted = applications.filter((a) => a.status === "ACCEPTED");
  const rejected = applications.filter((a) => a.status === "REJECTED");

  const visiblePending = pending.slice(0, visiblePendingCount);
  const visibleAccepted = accepted.slice(0, visibleAcceptedCount);
  const visibleRejected = rejected.slice(0, visibleRejectedCount);

  const handlePendingShowMore = () =>
    setVisiblePendingCount((prev) => prev + 3);
  const handleAcceptedShowMore = () =>
    setVisibleAcceptedCount((prev) => prev + 3);
  const handleRejectedShowMore = () =>
    setVisibleRejectedCount((prev) => prev + 3);

  return (
    <div className="mt-[30px] flex flex-col gap-12 items-center w-full">
      {/* 대기 중인 신청 */}
      {visiblePending.length > 0 && (
        <section className="flex flex-col gap-6 items-center w-full">
          <h3 className="w-[726px] text-left font-bold text-[16px]">
            🕓 대기 중인 신청
          </h3>
          {visiblePending.map((user, i) => (
            <div key={`pending-${i}`}>
              <div className="flex justify-between w-[726px] bg-customGray-200 rounded-[8px] p-3">
                <div className="flex gap-2">
                  <div className="font-semibold">{user.applicantNickname}</div>
                  <p>님이 동행신청을 했습니다! 수락하시겠습니까?</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={async () => {
                      try {
                        await acceptAccompany(
                          user.matePostId,
                          user.applicantId
                        );
                        toast.success("수락이 완료되었습니다!");
                        onChanged?.();
                      } catch (error) {
                        console.error("수락 실패:", error);
                        toast.error("수락에 실패했습니다.");
                      }
                    }}
                  >
                    ✅
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await rejectAccompany(
                          user.matePostId,
                          user.applicantId
                        );
                        toast.success("수락이 거절되었습니다!");
                      } catch (error) {
                        console.error("거절 실패:", error);
                        toast.error("거절에 실패했습니다.");
                      }
                    }}
                  >
                    ❌
                  </button>
                </div>
              </div>

              <SingleComment
                comment={{
                  title: user.mateTitle,
                  content: user.mateContentPreview,
                  author: user.applicantNickname ?? "익명",
                  avatar: user.applicantProfileImage || "/defaultAvatar/31.png",
                  date: new Date().toISOString(),
                }}
              />
            </div>
          ))}
        </section>
      )}
      {visiblePendingCount < pending.length && (
        <div
          onClick={handlePendingShowMore}
          className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mb-[113px] hover:bg-customGray-600"
        >
          <div className="text-white text-[13px] font-semibold font-pretendard">
            더보기
          </div>
        </div>
      )}
      {/* 수락된 신청 */}
      {visibleAccepted.length > 0 && (
        <section className="flex flex-col gap-6 items-center w-full">
          <h3 className="w-[726px] text-left font-bold text-[16px]">
            ✅ 수락한 신청
          </h3>
          {visibleAccepted.map((user, i) => (
            <SingleComment
              key={`accepted-${i}`}
              comment={{
                title: user.mateTitle,
                content: user.mateContentPreview,
                author: user.applicantNickname ?? "익명",
                avatar: user.applicantProfileImage || "/defaultAvatar/31.png",
                date: new Date().toISOString(),
              }}
            />
          ))}
        </section>
      )}{" "}
      {visibleAcceptedCount < accepted.length && (
        <div
          onClick={handleAcceptedShowMore}
          className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mb-[113px] hover:bg-customGray-600"
        >
          <div className="text-white text-[13px] font-semibold font-pretendard">
            더보기
          </div>
        </div>
      )}
      {/* 거절된 신청 */}
      {visibleRejected.length > 0 && (
        <section className="flex flex-col gap-6 items-center w-full">
          <h3 className="w-[726px] text-left font-bold text-[16px]">
            ❌ 거절한 신청
          </h3>
          {visibleRejected.map((user, i) => (
            <SingleComment
              key={`rejected-${i}`}
              comment={{
                title: user.mateTitle,
                content: user.mateContentPreview,
                author: user.applicantNickname ?? "익명",
                avatar: user.applicantProfileImage || "/defaultAvatar/31.png",
                date: new Date().toISOString(),
              }}
            />
          ))}
        </section>
      )}
      {/* 더보기 버튼 */}
      {visibleRejectedCount < rejected.length && (
        <div
          onClick={handleRejectedShowMore}
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
