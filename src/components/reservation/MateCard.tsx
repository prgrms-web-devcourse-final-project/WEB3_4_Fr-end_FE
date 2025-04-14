"use client";

import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import type { MateCardData } from "@/types/mateBoard/MateCardData";
import { useRouter } from "next/navigation";
import { travelRegions } from "@/constants/travelRegion";

export default function MateCard({ data }: { data: MateCardData }) {
  const router = useRouter();

  // 지역명을 변환하는 함수
  const getRegionLabel = (regionValue: string) => {
    const region = travelRegions.find((item) => item.value === regionValue);
    return region ? region.label : regionValue;
  };

  // 여행 일수 계산 함수
  const calculateTravelDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <div className="w-[302px] h-full border border-customGray-300 rounded-tr-2xl relative">
        {/* 모집 상태 블록 */}
        <div
          className={`absolute top-4 right-4 text-white text-sm font-bold py-1 px-3 rounded-full z-10 ${
            data.recruitCount > 0 ? "bg-red-900" : "bg-customGray-400"
          }`}
        >
          {data.recruitCount > 0 ? "모집중" : "모집완료"}
        </div>

        {/* 이미지 섹션 */}
        <div className="w-full h-49 relative overflow-hidden rounded-tr-2xl">
          <Image
            src={data.imageUrl || "/reservationImg/testImg.webp"}
            alt="메이트카드 이미지"
            fill
            quality={100}
          />
        </div>

        {/* 내용 섹션 */}
        <div className="my-3 mx-4">
          <div className="font-semibold text-xl whitespace-nowrap overflow-hidden overflow-ellipsis">
            {data.title}
          </div>
          <div className="text-sm mb-2">{data.nickname}</div>
          <div className="text-sm flex gap-1 items-center">
            <FaCalendarAlt />
            <div>
              {data.travelStartDate} - {data.travelEndDate} (
              {calculateTravelDays(data.travelStartDate, data.travelEndDate)}일)
              {/* 여행 일수를 실제로 계산하여 표시 */}
            </div>
          </div>
          <div className="text-sm flex gap-1 items-center">
            <CiLocationOn />
            <div>{getRegionLabel(data.travelRegion)}</div>{" "}
            {/* 한국어 지역명 표시 */}
          </div>
          <button
            className="bg-customGray-100 w-full cursor-pointer text-center py-1 mt-2 rounded-xl"
            onClick={() => {
              router.push(`/mateBoard/detail/${data.matePostId}`);
            }}
          >
            더 알아보기
          </button>
        </div>
      </div>
    </>
  );
}
