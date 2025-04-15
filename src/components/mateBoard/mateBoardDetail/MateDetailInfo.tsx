"use client";

import Image from "next/image";
import ReportButton from "@/components/mateBoard/mateBoardDetail/ReportButton";
import { MateDetailData } from "@/types/mateBoard/MateDetailData";

import { getGenderLabel } from "@/utils/getGenderLabel";
import { getTravelRegionLabel } from "@/utils/getTravelRegion";
import MateEditButton from "@/components/mateBoard/mateBoardDetail/MateEditButton";
import MateDeleteButton from "@/components/mateBoard/mateBoardDetail/MateDeleteButton";
import { useAuthStore } from "@/store/useAuthStore";

type MateDetailPageProps = {
  data: MateDetailData;
};

export default function MateDetailInfo({ data }: MateDetailPageProps) {
  const userId = useAuthStore((state) => state.user?.id);
  const authorId = data.authorId;

  return (
    <div className=" py-12 max-w-5xl mx-auto space-y-12">
      {/* 제목 */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.title}</h1>
        {userId === authorId && (
          <div className="flex flex-row gap-5">
            <MateEditButton PostId={data.matePostId} />
            <MateDeleteButton PostId={data.matePostId} />
          </div>
        )}
      </div>

      {/* 여행 일정 */}
      <div className="bg-white shadow rounded-xl p-6 space-y-2 border border-gray-100">
        <div className="text-[20px] font-semibold text-customBlack-200 ">
          📅 여행 일정
        </div>
        <div className="text-[20px] font-medium text-customGray-600">
          {data.travelStartDate} ~ {data.travelEndDate}
        </div>
        <div className="text-[20px] font-semibold text-customBlack-200">
          📍 {getTravelRegionLabel(data.travelRegion)}
        </div>
      </div>

      {/* 모집 인원 */}
      <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
        <div className="text-[20px] text-customBlack-200 font-semibold mb-2">
          👥 모집인원 및 선호성별
        </div>
        <div className="text-[20px] text-customGray-600 ">
          {data.recruitmentStatus === "CLOSED"
            ? "모집완료"
            : `모집인원 : ${data.recruitCount}명`}
        </div>
        <div className="text-[20px] text-customGray-600 ">
          선호성별 : {getGenderLabel(data.mateGender)}
        </div>
      </div>

      {/* 여행 소개 + 이미지 */}
      <div className="w-full bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col md:flex-row items-start gap-6">
        {/* 왼쪽: 텍스트 소개 */}
        <div className="flex-1 space-y-3">
          <div className="text-[20px] text-customBlack-200 font-semibold">
            📝 여행 소개
          </div>
          <div className="whitespace-pre-line text-customGray-600 leading-relaxed text-[20px]">
            {data.content}
          </div>
        </div>

        {/* 오른쪽: 이미지 */}
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            alt="프로필 이미지"
            className="w-full md:w-[250px] h-[250px] rounded-xl object-cover border border-gray-200 shadow"
            width={250}
            height={250}
          />
        ) : (
          <div className="w-full md:w-[250px] h-[250px] rounded-xl overflow-hidden border border-gray-200 shadow">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-semibold text-lg">
              이미지 없음
            </div>
          </div>
        )}
      </div>

      {/* 여행장 */}
      <div className="bg-gray-50 rounded-xl p-6">
        {/* 상단: 프로필 영역 */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
            <Image
              src={data.profileImage || "/default-profile.png"}
              alt="프로필"
              className="rounded-full object-cover"
              fill
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between text-[16px] font-semibold text-customBlack-200">
              <span>{data.nickname}</span>
              <ReportButton />
            </div>
            <div className="text-[16px] text-customGray-600">
              {getGenderLabel(data.authorGender)}
            </div>
          </div>
        </div>

        <hr className="my-4 border-customGray-300" />

        {/* 유저소개 */}
        <p className="text-[16px] text-customGray-600">
          {data.bio || "소개글이 없습니다."}
        </p>
      </div>
    </div>
  );
}
