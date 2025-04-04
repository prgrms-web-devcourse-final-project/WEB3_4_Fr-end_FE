"use client";

import { useState } from "react";
import Image from "next/image";

export default function TodayReservationSection() {
  const [activeIndex, setActiveIndex] = useState<number>(1); // 초기 설정

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  // 샘플 데이터 (이미지 경로, 이름, 가격)
  const boxes = [
    {
      imageSrc: "/reservationImg/hotel.webp",
      name: "그랜드 하얏트 제주",
      price: "150,000",
    },
    {
      imageSrc: "/reservationImg/pension.webp",
      name: "그랜드 하얏트 제주",
      price: "120,000",
    },
    {
      imageSrc: "/reservationImg/motel.webp",
      name: "그랜드 하얏트 제주",
      price: "80,000",
    },
    {
      imageSrc: "/reservationImg/koreanHouse.webp",
      name: "그랜드 하얏트 제주",
      price: "200,000",
    },
  ];

  return (
    <section className="mt-20">
      <div className="font-paperlogy text-4xl">Planit 오늘의 추천</div>
      <div className="text-lg font-medium">Planit이 엄선한 특별한 숙소</div>
      <div className="flex h-88 gap-4 mt-4">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`relative rounded overflow-hidden ${
              activeIndex === index ? "flex-1" : "w-49"
            } transition-all duration-300 cursor-pointer`}
            onClick={() => handleClick(index)}
          >
            <Image
              src={box.imageSrc}
              alt={`${box.name} 이미지`}
              fill
              style={{ objectFit: "cover", filter: "brightness(80%)" }}
            />
            {activeIndex === index && (
              <div className="absolute bottom-0 right-0 mb-3 mr-5 font-bold text-right text-white">
                <div className="text-xl">{box.name}</div>
                <div className="text-4xl">{box.price}원</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
