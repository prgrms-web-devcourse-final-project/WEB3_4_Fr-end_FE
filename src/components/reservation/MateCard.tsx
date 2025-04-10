"use client";

import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import type { MateCardData } from "@/types/mateBoard/MateCardData";
import { useRouter } from "next/navigation";

export default function MateCard({ data }: { data: MateCardData }) {
  const router = useRouter();

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
            src={data.thumbnailUrl}
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
          <div className="text-sm mb-2">{data.user.name}</div>
          <div className="text-sm flex gap-1 items-center">
            <FaCalendarAlt />
            <div>
              {data.period.startDate} - {data.period.endDate}(1일)
            </div>
          </div>
          <div className="text-sm flex gap-1 items-center">
            <CiLocationOn />
            <div>{data.region}</div>
          </div>
          <button
            className="bg-customGray-100 w-full cursor-pointer text-center py-1 mt-2 rounded-xl"
            onClick={() => {
              router.push(`/mateBoard/detail/${data.id}`);
            }}
          >
            더 알아보기
          </button>
        </div>
      </div>
    </>
  );
}
