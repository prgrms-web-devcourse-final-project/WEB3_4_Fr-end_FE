"use client";

import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { MateCardData } from "@/types/MateCardData";
import LikeButton from "@/components/mateBoard/mateBoardMain/LikeButton";
import CommentCount from "@/components/mateBoard/mateBoardMain/CommentCount";

export default function MateCard({ data }: { data: MateCardData }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/mateBoard/detail/${data.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-[350px] rounded-2xl bg-gray-50 p-6 flex justify-between
      cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="flex flex-col gap-3 w-[60%]">
        {/* 모집 상태 */}
        <div
          className={`text-sm font-medium rounded-md px-3 py-1 w-fit
    ${
      data.recruitCount === 0
        ? "text-customPink-300 bg-white"
        : "text-customGreen-200 bg-white"
    }
  `}
        >
          {data.recruitCount === 0
            ? "모집완료"
            : `${data.recruitCount}명 모집 중`}
        </div>

        {/* 제목 */}
        <h2 className="text-[28px] font-bold">{data.title}</h2>

        {/* 설명 */}
        <p className="text-muted-foreground text-[20px] overflow-hidden">
          {data.description}
        </p>

        {/* 유저 정보 */}
        <div className="flex items-center gap-x-2 mt-auto">
          <Image
            src={data.user.imageUrl}
            alt="프로필"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-[16px] text-muted-foreground">
            {data.user.name} · {data.user.age} · {data.user.gender}
          </span>
        </div>

        {/* 날짜 */}
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {data.period.startDate} - {data.period.endDate}(
          {data.period.durationText})
        </div>
        <div className="flex items-center gap-x-3 text-sm">
          <LikeButton
            count={5}
            onclick={(e) => {
              e.stopPropagation();
              alert("좋아요 완료");
            }}
          />
          <CommentCount count={2} />
        </div>
      </div>

      {/* 오른쪽 썸네일 + 지역 */}
      <div className="flex flex-col items-center justify-start gap-5">
        <div className="w-[220px] h-[220px] overflow-hidden rounded-xl">
          <Image
            src={data.thumbnailUrl}
            alt={`${data.region} 썸네일`}
            width={220}
            height={220}
            className="rounded-xl object-cover aspect-square"
          />
        </div>
        <span className="text-customGreen-200 font-bold text-[24px] mt-2">
          {data.region}
        </span>
      </div>
    </div>
  );
}
