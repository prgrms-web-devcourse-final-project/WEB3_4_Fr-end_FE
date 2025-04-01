"use client";

import Image from "next/image";

const dummyContent = [
    {
        id:1,
        img: "testImg.webp",
        state: "이용완료",
        name: "강남스테이힐",
        street: "서울특별시 강남구 테헤란로13길 65",
    },
]

export default function MyReservationCard() {
  return (
    <div className="w-[723px] h-[136px] relative">
      <div className="w-[722px] h-px left-0 top-[135px] absolute bg-[#d9d9d9]" />
      <Image
        src="/myReservation/testImg.webp"
        alt="defaultImg"
        width={120}
        height={120}
        className="w-[120px] h-[120px] left-0 top-0 absolute rounded-2xl"
      />
      <div className="left-[134px] top-0 absolute justify-start text-neutral-600 text-[13px] font-semibold font-['Pretendard']">
        이용완료
      </div>
      <div className="left-[134px] top-[21px] absolute justify-start text-black text-xl font-semibold font-['Pretendard']">
        강남스테이힐(Gangnam Stay Hill)
      </div>
      <div className="left-[134px] top-[48px] absolute justify-start text-black text-[13px] font-normal font-['Pretendard']">
        서울특별시 강남구 테헤란로13길 65
      </div>
      <div className="left-[652px] top-[1px] absolute justify-start text-[#80caff] text-[13px] font-semibold font-['Pretendard']">
        예약내역 삭제
      </div>
      <div className="w-[93px] h-[31px] left-[137px] top-[79px] absolute bg-[#707070] rounded-lg" />
      <div className="left-[159px] top-[86px] absolute justify-start text-[#f2f2f2] text-[13px] font-semibold font-['Pretendard']">
        상세 보기
      </div>
    </div>
  );
}
