"use client";

import { useEffect, useState } from "react";
import MateSearch from "@/components/mateBoard/mateBoardMain/MateSearch";
import CategoryFilter from "@/components/mateBoard/mateBoardMain/CategoryFilter";
import MateCardList from "@/components/mateBoard/mateBoardMain/MateCardList";
import { useDebounce } from "@/hooks/useDebounce";
import type { MateCardData } from "@/types/mateBoard/MateCardData";
import PaginationControls from "@/components/mateBoard/mateBoardMain/PaginationControls";
import WritingButton from "@/components/mateBoard/mateBoardMain/WritingButton";

interface MateBoardFilterProps {
  cards: MateCardData[];
  totalPages: number;
  currentPage: number;
  /**
   * 필터 변경 시 호출될 콜백.
   * newFilters 객체에 keyword, region, category, page 등의 값을 담아 전달합니다.
   */
  onFilterChange: (newFilters: {
    keyword?: string;
    region?: string;
    category?: string;
    page?: number;
  }) => void;
}

export default function MateBoardFilter({
  cards,
  totalPages,
  currentPage,
  onFilterChange,
}: MateBoardFilterProps) {
  // 로컬에서 검색 및 필터 입력 상태 관리 (서버 요청 시 전달)
  const [searchInput, setSearchInput] = useState("");
  const [region, setRegion] = useState("전국");
  const [category, setCategory] = useState("전체");

  // 사용자의 검색 입력값을 디바운싱해서 서버 요청을 너무 자주 보내지 않도록 처리
  const debouncedSearch = useDebounce(searchInput, 1000);

  // 검색어나 필터값이 변경되면 상위 컴포넌트로 알림 (페이지는 1로 초기화)
  useEffect(() => {
    onFilterChange({
      keyword: debouncedSearch,
      region,
      category,
      page: 1,
    });
  }, [debouncedSearch, region, category, onFilterChange]);

  // 검색 버튼 클릭 시에도 상위 컴포넌트에 알림 (페이지 1로)
  const handleSubmit = () => {
    onFilterChange({
      keyword: searchInput,
      region,
      category,
      page: 1,
    });
  };

  return (
    <div>
      <div className="space-y-6 mb-20 flex flex-col items-center">
        <MateSearch
          search={searchInput}
          category={region}
          onSearchChange={setSearchInput}
          onRegionChange={setRegion}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="mb-5 flex">
        <CategoryFilter value={category} onChange={setCategory} />
        <div className="ml-auto">
          <WritingButton />
        </div>
      </div>
      <div className="mb-20">
        {/* 서버에서 이미 필터링된 데이터를 그대로 렌더링 */}
        <MateCardList cards={cards} />
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        // 페이지 변경 시 상위 컴포넌트에 새로운 페이지 번호 전달
        onPageChange={(newPage) => onFilterChange({ page: newPage })}
      />
    </div>
  );
}
