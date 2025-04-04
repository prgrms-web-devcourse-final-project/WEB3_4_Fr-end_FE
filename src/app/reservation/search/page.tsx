"use client";

import ReservationPagination from "@/components/reservation/ReservationPagination";
import ReservationSearchCard from "@/components/reservation/ReservationSearchCard";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const mockData = [
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "서울",
    houseType: "게스트하우스",
    houseName: "강남스테이힐(Gangnam Stay Hill)",
    location: "서울특별시 강남구 테헤란로13길 65",
    id: "1",
  },
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "부산",
    houseType: "호텔",
    houseName: "해운대블리스(Bliss Hotel)",
    location: "부산광역시 해운대구 우동 123-45",
    id: "1",
  },
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "제주",
    houseType: "리조트",
    houseName: "제주오션뷰(Jeju Ocean View)",
    location: "제주특별자치도 서귀포시 중문로 99",
    id: "1",
  },
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "인천",
    houseType: "펜션",
    houseName: "인천바다향기(Incheon Sea Breeze)",
    location: "인천광역시 연수구 송도동 89-12",
    id: "1",
  },
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "서울",
    houseType: "게스트하우스",
    houseName: "강남스테이힐(Gangnam Stay Hill)",
    location: "서울특별시 강남구 테헤란로13길 65",
    id: "1",
  },
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "부산",
    houseType: "호텔",
    houseName: "해운대블리스(Bliss Hotel)",
    location: "부산광역시 해운대구 우동 123-45",
    id: "1",
  },
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "제주",
    houseType: "리조트",
    houseName: "제주오션뷰(Jeju Ocean View)",
    location: "제주특별자치도 서귀포시 중문로 99",
    id: "1",
  },
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "인천",
    houseType: "펜션",
    houseName: "인천바다향기(Incheon Sea Breeze)",
    location: "인천광역시 연수구 송도동 89-12",
    id: "1",
  },
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "제주",
    houseType: "리조트",
    houseName: "제주오션뷰(Jeju Ocean View)",
    location: "제주특별자치도 서귀포시 중문로 99",
    id: "1",
  },
  {
    imageSrc: "/reservationImg/testImg.webp",
    area: "인천",
    houseType: "펜션",
    houseName: "바다향기(Incheon Sea Breeze)",
    location: "인천광역시 연수구 송도동 89-12",
    id: "1",
  },
];

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || [] // 쿼리에서 카테고리 설정
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    searchParams.get("regions")?.split(",") || []
  );
  const [searchInput, setSearchInput] = useState(
    searchParams.get("query") || ""
  );
  const [finalSearch, setFinalSearch] = useState(searchInput);
  const debouncedSearch = useDebounce(searchInput, 1000);

  const updateQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (selectedRegions.length > 0) {
      params.set("regions", selectedRegions.join(","));
    }
    if (finalSearch) {
      params.set("query", finalSearch);
    }
    params.set("page", currentPage.toString());

    router.push(`?${params.toString()}`);
  }, [selectedCategories, selectedRegions, finalSearch, currentPage, router]);

  useEffect(() => {
    updateQueryParams();
  }, [updateQueryParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((item) => item !== region)
        : [...prev, region]
    );
    setCurrentPage(1);
  };

  const handleSearchSubmit = () => {
    setFinalSearch(searchInput);
    setCurrentPage(1);
  };

  const filteredData = mockData.filter(
    (item) =>
      (selectedCategories.length > 0
        ? selectedCategories.includes(item.houseType)
        : true) &&
      (selectedRegions.length > 0
        ? selectedRegions.includes(item.area)
        : true) &&
      (finalSearch
        ? item.houseName.includes(finalSearch)
        : item.houseName.includes(debouncedSearch))
  );

  const totalPages = Math.ceil(filteredData.length / 8);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );

  return (
    <>
      {/* 숙소 검색 배너 */}
      <div className="h-75 w-screen relative left-1/2 right-1/2 -translate-x-1/2 mb-20">
        <Image
          src={"/reservationImg/reservationBanner.webp"}
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
        {/* 왼쪽 필터 */}
        <div className="w-[302px] flex flex-col gap-5">
          <div className="font-bold text-xl">필터</div>

          <div className="w-[302px] h-8 px-4 py-1 rounded-[30px] outline-1 outline-offset-[-1px] flex justify-between items-center">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit();
              }}
              placeholder="숙소 이름을 입력하세요"
              className="w-full h-full bg-transparent text-[13px] font-normal outline-none"
            />
            <IoIosSearch />
          </div>

          <div className="flex flex-col gap-3">
            {["호텔", "펜션", "모텔", "한옥"].map((category) => (
              <div key={category} className="flex items-center gap-2">
                <input
                  id={category}
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="hidden"
                />
                <label
                  htmlFor={category}
                  className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer"
                >
                  <span
                    className={`w-5 h-5 rounded-full ${
                      selectedCategories.includes(category)
                        ? "bg-customBlue-100"
                        : "bg-transparent"
                    }`}
                  ></span>
                </label>
                <span>{category}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="border-1 border-customGray-300 mb-5"></div>
            <div className="font-bold mb-5">지역</div>
            <div className="grid grid-cols-3 gap-[10px] text-center">
              {[
                "서울",
                "제주",
                "강원도",
                "부산",
                "전라도",
                "충청도",
                "경기도",
                "경상도",
                "인천",
              ].map((region) => (
                <div
                  key={region}
                  onClick={() => handleRegionClick(region)}
                  className={`py-1 px-6 border rounded-[20px] cursor-pointer ${
                    selectedRegions.includes(region)
                      ? "bg-customBlue-200 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {region}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 검색 결과 */}
        <div className="w-full">
          <div className="font-semibold text-2xl mb-6">
            전체 검색 결과 {filteredData.length}개
          </div>
          <div className="grid grid-cols-2 gap-4">
            {paginatedData.map((item, index) => (
              <ReservationSearchCard
                key={index}
                imageSrc={item.imageSrc}
                area={item.area}
                houseType={item.houseType}
                houseName={item.houseName}
                location={item.location}
                id={item.id}
              />
            ))}
          </div>

          {/* 페이지네이션 컨트롤 */}
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
