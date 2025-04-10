"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import MateSearch from "@/components/mateBoard/mateBoardMain/MateSearch";
import CategoryFilter from "@/components/mateBoard/mateBoardMain/CategoryFilter";
import MateCardList from "@/components/mateBoard/mateBoardMain/MateCardList";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationControls from "@/components/mateBoard/mateBoardMain/PaginationControls";
import WritingButton from "@/components/mateBoard/mateBoardMain/WritingButton";
import type { MateBoardFilterProps } from "@/types/mateBoard/MateBoardFilterProps";

export default function MateBoardFilter({
  cards,
  totalPages,
  currentPage,
  onFilterChange,
  initialRegion,
  initialStatus,
  initialKeyword,
}: MateBoardFilterProps) {
  // 필터 상태 관리 (초기값은 부모에서 전달받은 값)
  const [searchInput, setSearchInput] = useState(initialKeyword);
  const [region, setRegion] = useState(initialRegion);
  const [status, setStatus] = useState(initialStatus);
  const [currentPageState, setCurrentPageState] = useState(currentPage);

  const debouncedSearch = useDebounce(searchInput, 1000);

  // 이전 필터 값을 저장하는 ref (초기 렌더링 시 초기값으로 설정)
  const previousFiltersRef = useRef({
    keyword: initialKeyword,
    region: initialRegion,
    status: initialStatus,
  });

  // 필터 값이 변경되었을 때만 페이지를 1로 리셋하고 onFilterChange 호출
  useEffect(() => {
    const previous = previousFiltersRef.current;
    // 필터가 이전과 다르면 페이지를 1로 리셋
    if (
      debouncedSearch !== previous.keyword ||
      region !== previous.region ||
      status !== previous.status
    ) {
      setCurrentPageState(1);
      onFilterChange({
        keyword: debouncedSearch,
        region,
        status,
        page: 1,
      });
      // 현재 필터를 이전 필터로 업데이트
      previousFiltersRef.current = {
        keyword: debouncedSearch,
        region,
        status,
      };
    } else {
      // 필터 변화가 없으면 현재 페이지를 그대로 유지
      onFilterChange({
        keyword: debouncedSearch,
        region,
        status,
        page: currentPageState,
      });
    }
  }, [debouncedSearch, region, status, onFilterChange, currentPageState]);

  // 검색 제출 이벤트
  const handleSubmit = useCallback(() => {
    // 동일한 로직을 사용하여 필터 변경 시 페이지를 1로 리셋
    const previous = previousFiltersRef.current;
    if (
      searchInput !== previous.keyword ||
      region !== previous.region ||
      status !== previous.status
    ) {
      setCurrentPageState(1);
      onFilterChange({
        keyword: searchInput,
        region,
        status,
        page: 1,
      });
      previousFiltersRef.current = {
        keyword: searchInput,
        region,
        status,
      };
    } else {
      onFilterChange({
        keyword: searchInput,
        region,
        status,
        page: currentPageState,
      });
    }
  }, [searchInput, region, status, onFilterChange, currentPageState]);

  // 페이지 변경 이벤트 핸들러: 필터 값은 그대로 유지하면서 페이지 번호만 변경
  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPageState(newPage);
      onFilterChange({
        keyword: debouncedSearch,
        region,
        status,
        page: newPage,
      });
    },
    [debouncedSearch, region, status, onFilterChange]
  );

  return (
    <div className="space-y-8">
      <div className="mb-20 flex flex-col items-center">
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
