"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReservationLocationCategorySection() {
  const [activeRegion, setActiveRegion] = useState<string>("서울");

  const router = useRouter();

  const regions = ["서울", "경기", "강원", "부산", "제주"];
  // 더미데이터
  const listings = [
    {
      region: "서울",
      address: "서울특별시 강남구 테헤란로13길 65",
      name: "강남스테이힐(Gangnam Stay Hill)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "서울",
      address: "서울특별시 중구 명동길 10",
      name: "명동호텔(Myungdong Hotel)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "서울",
      address: "서울특별시 중구 명동길 10",
      name: "명동호텔(Myungdong Hotel)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "서울",
      address: "서울특별시 중구 명동길 10",
      name: "명동호텔(Myungdong Hotel)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "경기",
      address: "경기도 성남시 분당구 판교로 25",
      name: "판교스테이힐(Pangyo Stay Hill)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "경기",
      address: "경기도 용인시 기흥구 동백로 150",
      name: "용인호텔(Yongin Hotel)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "강원",
      address: "강원도 춘천시 스포츠로 100",
      name: "춘천리조트(Chuncheon Resort)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "강원",
      address: "강원도 강릉시 경포로 300",
      name: "경포호텔(Gyeongpo Hotel)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "부산",
      address: "부산광역시 해운대구 해운대로 50",
      name: "해운대호텔(Haeundae Hotel)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "부산",
      address: "부산광역시 중구 광복로 20",
      name: "광복호텔(Gwangbok Hotel)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "제주",
      address: "제주특별자치도 제주시 애월읍 곽지리 101",
      name: "곽지리조트(Gwakji Resort)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
    {
      region: "제주",
      address: "제주특별자치도 서귀포시 중문로 200",
      name: "중문호텔(Jungmun Hotel)",
      imageSrc: "/reservationImg/testImg.webp",
      id: "1",
    },
  ];

  return (
    <section className="mt-20">
      <div className="font-paperlogy text-4xl">지역별 인기 숙소</div>
      <div className="text-lg font-medium">
        Planit이 추천하는 지역별 숙소 둘러보기
      </div>
      <div className="grid grid-cols-5 gap-50 font-medium text-2xl h-[54px] w-full mt-4 px-26 text-center items-center rounded-xl bg-customBlack-300 text-customGray-100">
        {regions.map((region) => (
          <div
            key={region}
            className={`cursor-pointer ${
              activeRegion === region
                ? "font-bold text-3xl"
                : "text-customGray-400"
            }`}
            onClick={() => setActiveRegion(region)}
          >
            {region}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {listings
          .filter((listing) => listing.region === activeRegion)
          .map((listing, index) => (
            <button
              key={index}
              className="h-100 bg-primary rounded-2xl mt-10 relative overflow-hidden hover:mt-6 transition-all duration-300 text-left p-0 border-none cursor-pointer"
              onClick={() => {
                router.push(`/reservation/${listing.id}`);
              }}
            >
              <Image
                src={listing.imageSrc}
                alt={`${listing.name} 이미지`}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-customBlack-200 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 m-4 text-white">
                <div className="text-sm">{listing.address}</div>
                <div className="text-xl font-bold">{listing.name}</div>
              </div>
            </button>
          ))}
      </div>
    </section>
  );
}
