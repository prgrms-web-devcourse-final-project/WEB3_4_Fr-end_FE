"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PlzTest() {
  const [schedules, setSchedules] = useState<string[]>([
    "롯데리아 화곡역점|11:00|숙소",
    "해운대 전통시장|11:10|관광지",
    "맛도리 국밥|12:00|음식점",
    "해운대 유람선|1:30|관광지",
  ]);

  // 일정 추가 함수
  const addSchedule = () => {
    setSchedules((prev) => [
      ...prev,
      `새 일정|${new Date().toLocaleTimeString()}|기타`,
    ]);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-lg text-left">day1</p>
        <p className="text-gray-500 text-center">2025.03.28 (금)</p>
        <p className="text-gray-500 text-right">
          총 <span className="text-yellow-500">{schedules.length}</span>개의 일정
        </p>
      </div>

      <div className="relative ml-4">
        {schedules.map((schedule, idx) => {
          const [title, time, type] = schedule.split("|");
          return (
            <div
              key={idx}
              className="flex items-center gap-3 mb-4 relative z-10"
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold text-sm ${
                  idx === 0 ? "bg-yellow-400" : "bg-blue-400"
                }`}
                style={{
                  fontSize: "12px",
                  minWidth: "24px",
                  minHeight: "24px",
                  lineHeight: "24px",
                }}
              >
                {idx + 1}
              </div>
              <div
                className={`flex-1 px-4 py-4 rounded-lg shadow-md flex items-center ${
                  idx === 0
                    ? "bg-yellow-50 border border-yellow-400"
                    : "bg-gray-50"
                }`}
                style={{
                  minWidth: "200px",
                }}
              >
                {/* 왼쪽 시간 */}
                <div className="text-gray-800 font-semibold text-lg w-20">
                  {time}
                </div>
                {/* 오른쪽 제목과 유형 */}
                <div className="flex flex-col justify-center ml-2">
                  <p className="text-gray-800">{title}</p>
                  <p className="text-gray-400 text-sm">{type}</p>
                </div>
              </div>
            </div>
          );
        })}

        <Button
          onClick={addSchedule}
          className="flex items-center gap-1 bg-white text-black border border-gray-300 rounded-md p-2 mt-2"
        >
          <span className="text-xl">+</span> 일정 추가
        </Button>
      </div>
    </div>
  );
}
