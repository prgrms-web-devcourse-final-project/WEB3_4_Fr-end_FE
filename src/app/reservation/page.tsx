import ReservationCategorySection from "@/components/reservation/ReservationCategorySection";
import ReservationlocationCategorySection from "@/components/reservation/ReservationlocationCategorySection";
import ReservationMateSection from "@/components/reservation/ReservationMateSection";
import SchedulerLinkBannerSection from "@/components/reservation/SchedulerLinkBannerSection";
import TodayReservationSection from "@/components/reservation/TodayReservationSection";
import Image from "next/image";

import { dummyCards } from "@/dummyData/mateCards";

export default function Reservation() {
  return (
    <>
      {/* 숙소메인배너 */}
      <div className="h-100 w-screen relative left-1/2 right-1/2 -translate-x-1/2">
        <Image
          src={"/reservationImg/reservationBanner.webp"}
          alt="예약메인배너이미지"
          layout="fill"
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <div className="absolute inset-x-79 inset-y-22 font-paperlogy text-customGray-100">
          <div className="text-2xl mb-2">당신만의 특별한 여정을 Plan it !</div>
          <div className="text-4xl">
            Planit에서 찾는 꿈의 숙소 <br />
            지금 예약하세요
          </div>
        </div>
      </div>

      {/* 카테고리 섹션 */}
      <ReservationCategorySection />

      {/* 추천 숙소 섹션 */}
      <TodayReservationSection />

      {/* 스케쥴러 링크 배너 */}
      <SchedulerLinkBannerSection />

      {/* 지역별 숙소 섹션 */}
      <ReservationlocationCategorySection />

      {/* 여행메이트 섹션 */}
      <ReservationMateSection cards={dummyCards} />
    </>
  );
}
