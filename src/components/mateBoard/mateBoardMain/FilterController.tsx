// components/mateBoard/FilterController.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import MateBoardFilter from "@/components/mateBoard/mateBoardMain/MateBoardFilter";
import type { MateCardData } from "@/types/mateBoard/MateCardData";

interface FilterControllerProps {
  cards: MateCardData[];
  totalPages: number;
  currentPage: number;
}

export default function FilterController({
  cards,
  totalPages,
  currentPage,
}: FilterControllerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 URL의 쿼리 스트링 가져오기
  const currentQuery = searchParams.toString();

  const handleFilterChange = useCallback(
    (newFilters: {
      keyword?: string;
      region?: string;
      category?: string;
      page?: number;
    }) => {
      // URLSearchParams에 새 필터 값 반영
      const query = new URLSearchParams();

      if (newFilters.keyword) query.set("keyword", newFilters.keyword);
      if (newFilters.region) query.set("region", newFilters.region);
      if (newFilters.category) query.set("category", newFilters.category);
      // 필터 변경 시 페이지 값은 1로 설정하거나, 변경된 페이지가 있을 경우 사용
      query.set("page", newFilters.page ? newFilters.page.toString() : "1");

      const newQueryStr = query.toString();

      // 현재 쿼리와 새 쿼리가 동일하면 업데이트하지 않음.
      if (currentQuery === newQueryStr) return;

      // 동일하지 않으면 새로운 URL로 업데이트하여 SSR 페이지 재요청
      router.push(`/mateBoard?${newQueryStr}`);
    },
    [router, currentQuery]
  );

  return (
    <MateBoardFilter
      cards={cards}
      totalPages={totalPages}
      currentPage={currentPage}
      onFilterChange={handleFilterChange}
    />
  );
}
