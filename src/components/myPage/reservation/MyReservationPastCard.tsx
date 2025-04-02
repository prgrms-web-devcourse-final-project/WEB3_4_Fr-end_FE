"use client";

import Image from "next/image";

type CardProps = {
  item: {
    id: number;
    img: string;
    state: boolean;
    name: string;
    street: string;
  };
};

export default function MyReservationCard({ item }: CardProps) {
  return (
    <div className="w-[723px] bg-white p-2 border-b border-customGray-300 mb-[15px]">
      <div className="flex mt-2 mb-[15px]">
        <Image
          src={`/myReservation/${item.img}`}
          alt={item.name}
          width={120}
          height={120}
          className="rounded-[16px] w-[120px] h-[120px]"
        />
        <div className="ml-4 flex flex-col justify-between w-[589px] max-h-[120px]">
          <div className="flex justify-between items-start mb-[5px]">
            <div className="text-[13px] font-semibold font-pretendard text-customGray-600">
              {item.state ? "이용완료" : "예약취소"}
            </div>
            <div className="text-[13px] font-semibold text-customBlue-100 cursor-pointer hover:text-customBlue-200">
              예약내역 삭제
            </div>
          </div>
          <div>
            <div className="text-[20px] font-semibold text-black font-pretendard mb-[3px]">
              {item.name}
            </div>
            <div className="text-[13px] text-black mb-[15px]">
              {item.street}
            </div>
          </div>
          <button className="w-[93px] h-[31px] bg-customGray-500 text-white text-[13px] font-semibold rounded-[8px] px-[22px] hover:bg-customBlue-100 cursor-pointer">
            상세 보기
          </button>
        </div>
      </div>
    </div>
  );
}
