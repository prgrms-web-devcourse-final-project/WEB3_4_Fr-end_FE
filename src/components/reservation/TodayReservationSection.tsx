"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";

// Props 타입 정의
interface Reservation {
  id: number;
  name: string;
  mainImage: string;
  pricePerNight: number;
}

interface TodayReservationSectionProps {
  reservations: Reservation[];
}

export default function TodayReservationSection({
  reservations,
}: TodayReservationSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0); // 초기 인덱스를 0으로 수정

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const router = useRouter();

  return (
    <section className="mt-20">
      <div className="font-paperlogy text-4xl">Planit 오늘의 추천</div>
      <div className="text-lg font-medium">Planit이 엄선한 특별한 숙소</div>
      <div className="flex h-88 gap-4 mt-4">
        {reservations.map((reservation, index) => (
          <div
            key={reservation.id}
            className={`relative rounded overflow-hidden ${
              activeIndex === index ? "flex-1" : "w-49"
            } transition-all duration-300 cursor-pointer`}
            onClick={() => handleClick(index)}
          >
            <Image
              src={reservation.mainImage || "/reservationImg/testImg.webp"}
              alt={`${reservation.name} 이미지`}
              fill
              style={{ objectFit: "cover", filter: "brightness(80%)" }}
            />
            {activeIndex === index && (
              <div className="absolute bottom-0 right-0 mb-3 mr-5 font-bold text-right text-white">
                <div className="text-xl">{reservation.name}</div>
                <button
                  className="flex text-4xl gap-2 items-center cursor-pointer"
                  onClick={() => {
                    router.push(`/reservation/${reservation.id}`);
                  }}
                >
                  <div>{formatPrice(reservation.pricePerNight)}</div>
                  <FaArrowCircleRight />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
