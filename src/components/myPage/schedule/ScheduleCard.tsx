"use client";

import { CalendarData } from "@/types/ScheuduleData";
import { useState } from "react";
import { deleteCalendar } from "@/lib/myPage/calendarDelete";
import toast from "react-hot-toast"; // 알림이 있으면 더 좋아요

interface CalendarProps {
  calendars: CalendarData[];
  onDelete?: (id: number) => void;
}

const badgeColors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-teal-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-purple-400",
  "bg-pink-400",
];

export default function ScheduleCard({ calendars, onDelete }: CalendarProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const commentPerPage = 3;

  const currentCalendar = calendars.slice(0, currentPage * commentPerPage);
  const totalCalendar = Math.ceil(calendars.length / commentPerPage);

  console.log(calendars);
  return (
    <div className="flex flex-col items-center">
      {currentCalendar.map((calendar) => {
        return (
          <div
            key={calendar.id}
            className="w-[726px] min-h-[115px] outline outline-customGray-300 rounded-[4px] p-[15px] mb-[15px]"
          >
            <div className="flex justify-between mb-[5px]">
              <div className="font-pretendard font-bold text-[20px] text-customBlack-100">
                {calendar.name}
              </div>
              <div
                onClick={async () => {
                  try {
                    await deleteCalendar(calendar.id);
                    toast.success("캘린더가 삭제되었습니다.");
                    onDelete?.(calendar.id);
                  } catch (err) {
                    console.error("삭제 실패:", err);
                    toast.error("삭제에 실패했습니다.");
                  }
                }}
                className="text-red-800 font-pretendard font-semibold text-[10px] hover:text-red-300 cursor-pointer"
              >
                캘린더 삭제
              </div>
            </div>
            <div className="font-pretendard font-normal text-[13px] text-customGray-500 mb-[15px]">
              {calendar.description}
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="font-pretendard font-semibold text-[13px]">
                Mate&nbsp;:&nbsp;&nbsp;
              </div>
              {calendar.mates.map((mate, i) => {
                const randomColor =
                  badgeColors[Math.floor(Math.random() * badgeColors.length)];

                return (
                  <div
                    key={i}
                    className={`min-w-[50px] h-[16px] px-[6px] py-[2px] ${randomColor} rounded-full flex justify-center items-center`}
                  >
                    <div className="text-white font-pretendard font-semibold text-[9px]">
                      {mate.userNickname}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {currentPage < totalCalendar && (
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
