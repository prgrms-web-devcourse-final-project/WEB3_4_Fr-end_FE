"use client";

import { useRouter } from "next/navigation";
import type { PlanHeaderProps } from "@/types/Scheduleindex";

export default function PlanHeader({
  calendarId,
  title,
  startDate,
  endDate,
}: PlanHeaderProps) {
  const router = useRouter();

  const handleScheduleClick = () => {
    router.push(`/calendar/${calendarId}`);
  };

  return (
    <div className="flex items-center h-24 pb-5 bg-white gap-14">
      <p className="font-bold text-4xl text-customBlack-400">{title}</p>
      <div className="flex items-center gap-6">
        <div className="text-center flex items-center gap-1 font-medium">
          <div className="mr-12 w-[5px] h-[5px] bg-[#89ADEF] blur-[2px] self-center"></div>
          <div>
            <p className="text-customGray-500 text-base font-semibold">시작일</p>
            <p className="font-semibold text-lg text-customGray-500">{startDate}</p>
          </div>
        </div>
        <span className="text-customGray-400">-</span>
        <div className="text-center">
          <p className="text-customGray-500 text-base font-medium">종료일</p>
          <p className="font-semibold text-lg text-customGray-500">{endDate}</p>
        </div>
        <button
          onClick={handleScheduleClick}
          className="mp-2 w-24 h-9 border text-sm border-customBlue-200 text-customBlue-200 
            bg-white font-bold rounded-2xl hover:bg-customBlue-200 hover:text-white 
            transition duration-300 cursor-pointer"
        >
          캘린더보기
        </button>
      </div>
    </div>
  );
}
