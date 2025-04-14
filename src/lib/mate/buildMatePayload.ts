// lib/mate/buildMatePayload.ts
import { format } from "date-fns";
import type { MateFormType } from "./mateFormSchema";

type BuildMatePayloadProps = MateFormType & {
  mateGender: string; // useState에서 관리하는 값
  images: File[]; // 이미지 배열
  imageUrl?: string;
};

export function buildMatePayload({
  title,
  content,
  people,
  location,
  dateRange,
  mateGender,
  imageUrl,
  images,
}: BuildMatePayloadProps) {
  // 날짜 변환
  const travelStartDate = format(dateRange.from, "yyyy-MM-dd");

  const travelEndDate = format(dateRange.to, "yyyy-MM-dd");

  // 성별 변환
  let finalMateGender = mateGender;
  if (mateGender === "무관") {
    finalMateGender = "NO_PREFERENCE";
  }

  const travelRegion = location === "지역 검색" ? "ALL" : location;

  return {
    title,
    content,
    recruitCount: people,
    travelRegion,
    travelStartDate,
    travelEndDate,
    mateGender: finalMateGender,
    imageId: images.length > 0 ? Math.floor(Math.random() * 100000) : undefined,
    travelEndDateValid: !!(dateRange.from && dateRange.to),
    imageUrl,
  };
}
