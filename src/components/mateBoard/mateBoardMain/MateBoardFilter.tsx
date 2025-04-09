// components/mateBoard/mateBoardMain/MateBoardFilter.tsx
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
  onFilterChange: (newFilters: {
    keyword?: string;
    region?: string;
    status?: string;
    page?: number;
  }) => void;
  // 부모로부터 전달받은 초기 필터 값
  initialRegion: string;
  initialStatus: string;
  initialKeyword: string;
}

export default function MateBoardFilter({
  cards,
  totalPages,
  currentPage,
  onFilterChange,
  initialRegion,
  initialStatus,
  initialKeyword,
}: MateBoardFilterProps) {
  // 부모로부터 전달받은 초기값으로 상태 초기화
  const [searchInput, setSearchInput] = useState(initialKeyword);
  const [region, setRegion] = useState(initialRegion);
  const [status, setStatus] = useState(initialStatus);
  const [currentPageState, setCurrentPageState] = useState(currentPage);

  const debouncedSearch = useDebounce(searchInput, 1000);

  // 필터(검색, region, status)가 변경될 때만 페이지를 1로 리셋하고 onFilterChange 호출
  useEffect(() => {
    setCurrentPageState(1);
    onFilterChange({
      keyword: debouncedSearch,
      region,
      status,
      page: 1,
    });
  }, [debouncedSearch, region, status, onFilterChange]);

  const handleSubmit = () => {
    setCurrentPageState(1);
    onFilterChange({
      keyword: searchInput,
      region,
      status,
      page: 1,
    });
  };

  // 페이지 변경 이벤트 핸들러: 필터 변경에 의한 리셋과는 분리하여 처리
  const handlePageChange = (newPage: number) => {
    setCurrentPageState(newPage);
    onFilterChange({ page: newPage });
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
        <CategoryFilter value={status} onChange={setStatus} />
        <div className="ml-auto">
          <WritingButton />
        </div>
      </div>
      <div className="mb-20">
        <MateCardList cards={cards} />
      </div>
      <PaginationControls
        currentPage={currentPageState}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
