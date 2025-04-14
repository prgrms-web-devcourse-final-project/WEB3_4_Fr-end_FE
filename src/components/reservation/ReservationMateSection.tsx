"use client";

import Image from "next/image";
import MateCard from "./MateCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import type { MateCardData } from "@/types/mateBoard/MateCardData";

export default function ReservationMateSection({
  cards,
}: {
  cards: MateCardData[];
}) {
  return (
    <section className="flex gap-10 w-full h-90 my-20">
      <div className="w-96">
        <div className="font-paperlogy text-6xl">#같이 가요</div>
        <div className="text-2xl font-semibold mt-4 mb-15">
          플래닛으로 구하는 여행메이트
        </div>
        <div className="ml-12 relative w-84 h-50">
          <Image
            src={"/svg/traveling.svg"}
            alt="여행svg"
            fill
            objectFit="cover"
          />
        </div>
      </div>
      <div className="w-full flex gap-4 overflow-auto">
        <Swiper
          slidesPerView={3.3}
          spaceBetween={16}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          style={{ overflow: "hidden" }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <MateCard key={card.matePostId} data={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
