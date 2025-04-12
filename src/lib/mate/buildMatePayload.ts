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

  // location → travelRegion 변환
  // location이 "지역 검색"이거나 ""이면 "ALL"로 처리할 수도 있음
  const travelRegion = location === "지역 검색" ? "ALL" : location;

  return {
    // 백엔드에서 요구하는 필드명
    title,
    content,
    recruitCount: people,
    travelRegion,
    travelStartDate,
    travelEndDate,
    mateGender: finalMateGender,
    // imageId는 예시로, 파일 업로드 후 반환된 ID가 있을 수 있음.
    // 지금은 단순히 이미지가 존재하면 아무 값이나 넣는다는 가정.
    imageId: images.length > 0 ? 9007199254740991 : undefined,
    // 필요에 따라 종료 날짜 유효성 체크
    travelEndDateValid: !!(dateRange.from && dateRange.to),
    imageUrl,
  };
}
