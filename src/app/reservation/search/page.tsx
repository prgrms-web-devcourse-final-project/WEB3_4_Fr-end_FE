"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ReservationSearchCard from "@/components/reservation/ReservationSearchCard";
import ReservationPagination from "@/components/reservation/ReservationPagination";
import FilterSidebar from "@/components/reservation/FilterSidebar";
import { searchAccommodations } from "@/apis/reservation/reservationApi";
import { Accommodation } from "@/types/searchReservation";
import { areaCodeMap, cat3Map } from "@/constants/reservationCodeMap";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    searchParams.get("region") || null
  );
  const [searchInput, setSearchInput] = useState(
    searchParams.get("title") || ""
  );
  const [finalSearch, setFinalSearch] = useState(
    searchParams.get("title") || ""
  );

  const [data, setData] = useState<Accommodation[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAccommodations = useCallback(async () => {
    setLoading(true);
    try {
      const areaCode = selectedRegion
        ? Object.keys(areaCodeMap).find(
            (key) => areaCodeMap[Number(key)] === selectedRegion
          )
        : undefined;

      const cat3 = selectedCategory
        ? Object.keys(cat3Map).find((key) => cat3Map[key] === selectedCategory)
        : undefined;

      const result = await searchAccommodations(
        currentPage,
        areaCode ? parseInt(areaCode) : undefined,
        finalSearch,
        cat3
      );

      setData(result.data);
      setTotalData(result.totalData);
    } catch (err) {
      setError("숙소 정보를 불러오는 데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedRegion, finalSearch, selectedCategory]);

  useEffect(() => {
    fetchAccommodations();
  }, [fetchAccommodations]);

  const updateQueryParams = useCallback(() => {
    const params = new URLSearchParams();

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    if (selectedRegion) {
      params.set("region", selectedRegion);
    }
    if (finalSearch) {
      params.set("title", finalSearch);
    }
    params.set("page", currentPage.toString());

    router.push(`?${params.toString()}`);
  }, [selectedCategory, selectedRegion, finalSearch, currentPage, router]);

  useEffect(() => {
    updateQueryParams();
  }, [updateQueryParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  const handleSearchSubmit = () => {
    setFinalSearch(searchInput);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalData / 10);

  return (
    <>
      <div className="h-75 w-screen relative left-1/2 right-1/2 -translate-x-1/2 mb-20">
        <Image
          src={"/reservationImg/reservationBanner2.webp"}
          alt="예약메인배너이미지"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <div className="absolute inset-x-79 inset-y-22 font-paperlogy text-customGray-100">
          <div className="text-4xl">
            Planit에서 찾는 꿈의 숙소 <br />
            지금 예약하세요
          </div>
        </div>
      </div>

      <div className="flex gap-30 mb-20">
        <FilterSidebar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearchSubmit={handleSearchSubmit}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          selectedRegion={selectedRegion}
          handleRegionClick={handleRegionClick}
        />

        <div className="w-full">
          <div className="font-semibold text-2xl mb-6">
            전체 검색 결과 {totalData}개
          </div>
          {loading && <p>로딩 중...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-2 gap-4">
              {data.map((item) => (
                <ReservationSearchCard
                  key={item.id}
                  imageSrc={item.mainImage}
                  area={areaCodeMap[item.areaCode]}
                  houseType={cat3Map[item.cat3]}
                  houseName={item.name}
                  location={item.location}
                  id={item.id.toString()}
                />
              ))}
            </div>
          )}
          <ReservationPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
