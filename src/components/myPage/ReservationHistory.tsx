"use client";

import { useRouter } from "next/navigation";
import MyReservationCard from "./reservation/MyReservationCard";

export default function ReservationHistory() {
  const router = useRouter();

  return (
    <div className="w-[726px] h-[763px] flex-col">
      <div className="font-bold text-[28px] font-[pretendard] mb-[21px]">
        내 예약 내역
      </div>
      <div className="w-[726px] bg-customGray-100 px-[25px] py-[30px] rounded-[4px]">
        <p className="font-semibold text-[16px] font-[pretendard]">
          예정된 여행이 없습니다.
        </p>
        <p className="text-[13px]">지금 새로운 예약을 진행해보세요!</p>
        <button
          type="button"
          onClick={() => router.push("/reservation")}
          className="w-[112px] h-[30px] rounded-[8px] bg-customBlue-200 text-white font-semibold text-[13px] font-pretendard mt-[7px] px-[15px] py-[3px] hover:bg-customViloet-200"
        >
          여행지 찾아보기
        </button>
      </div>

      <div className="mt-[47px]">
        <div className="font-bold text-[20px] font-pretendard mb-[17px]">
          이용완료 및 예약 취소
        </div>
        <MyReservationCard />
      </div>
    </div>
  );
}
