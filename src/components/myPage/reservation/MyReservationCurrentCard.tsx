"use client";

import Image from "next/image";

type CardProps = {
  item: {
    id: number;
    img: string;
    state: boolean;
    name: string;
    street: string;
    date: string;
    time: string;
  };
};

export default function MyReservationCurrentCard({ item }: CardProps) {
  const date = new Date(item.date);
  const formattedDate = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekDays[date.getDay()];
  return (
    <div className="w-[726px] bg-customGray-100 rounded-2xl mb-[15px] p-[10px]">
      <div className="text-[28px] font-bold font-pretendard ml-[9px] mb-[15px]">
        {formattedDate}({dayOfWeek})
      </div>
      <div className="flex gap-[15px] items-start">
        <Image
          src={`/myReservation/${item.img}`}
          alt={item.name}
          width={120}
          height={120}
          className="rounded-[16px] w-[120px] h-[120px]"
        />
        <div className="flex flex-col justify-between h-[120px]">
          <div className="mb-[15px]">
            <div className="text-[16px] font-normal font-pretendard text-black mb-[2px]">
              {formattedDate}({dayOfWeek}) {item.time}
            </div>
            <div className="text-[20px] font-semibold text-black font-pretendard mb-[3px]">
              {item.name}
            </div>
            <div className="text-[13px] font-normal font-pretendard text-black">
              {item.street}
            </div>
          </div>
          <button className="w-[93px] h-[31px] bg-customGray-600 text-white text-[13px] font-semibold rounded-[8px] px-[22px] hover:bg-customBlue-100">
            예약 취소
          </button>
        </div>
      </div>
    </div>
  );
}
