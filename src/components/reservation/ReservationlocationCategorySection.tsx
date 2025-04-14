"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchAccommodations } from "@/apis/reservation/reservationApi";
import { Accommodation } from "@/types/searchReservation";

export default function ReservationLocationCategorySection() {
  const [activeRegion, setActiveRegion] = useState<string>("서울");
  const [listings, setListings] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const regions = ["서울", "경기", "강원", "부산", "제주"];

  // 지역별 데이터를 가져오는 함수
  const fetchListingsByRegion = async (region: string) => {
    setLoading(true);
    setError(null);
    try {
      // 지역 코드를 매핑
      const areaCode = {
        서울: 1,
        경기: 31,
        강원: 32,
        부산: 6,
        제주: 39,
      }[region];

      if (!areaCode) throw new Error("지역 코드가 유효하지 않습니다.");

      const response = await searchAccommodations(1, areaCode);
      setListings(response.data);
    } catch (err) {
      console.error("데이터 로드 오류:", err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListingsByRegion(activeRegion);
  }, [activeRegion]);

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
        {loading ? (
          <div className="col-span-4 text-center">로딩 중입니다...</div>
        ) : error ? (
          <div className="col-span-4 text-center text-red-500">{error}</div>
        ) : listings.length === 0 ? (
          <div className="col-span-4 text-center">
            해당 지역에 숙소가 없습니다.
          </div>
        ) : (
          listings.slice(0, 4).map((listing) => (
            <button
              key={listing.id}
              className="h-100 bg-primary rounded-2xl mt-10 relative overflow-hidden hover:mt-6 transition-all duration-300 text-left p-0 border-none cursor-pointer"
              onClick={() => {
                router.push(`/reservation/${listing.id}`);
              }}
            >
              <Image
                src={listing.mainImage || "/reservationImg/testImg.webp"}
                alt={`${listing.name} 이미지`}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-customBlack-200 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 m-4 text-white">
                <div className="text-sm">{listing.location}</div>
                <div className="text-xl font-bold">{listing.name}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </section>
  );
}
