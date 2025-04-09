// components/mateBoard/FilterController.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import MateBoardFilter from "@/components/mateBoard/mateBoardMain/MateBoardFilter";
import type { MateCardData } from "@/types/mateBoard/MateCardData";

interface FilterControllerProps {
  cards: MateCardData[];
  totalPages: number;
  currentPage: number;
  initialRegion: string;
  initialStatus: string;
  initialKeyword: string;
}

export default function FilterController({
  cards,
  totalPages,
  currentPage,
  initialRegion,
  initialStatus,
  initialKeyword,
}: FilterControllerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.toString();

  const handleFilterChange = (newFilters: {
    keyword?: string;
    region?: string;
    status?: string;
    page?: number;
  }) => {
    const query = new URLSearchParams();
    if (newFilters.keyword) query.set("keyword", newFilters.keyword);
    if (newFilters.region) query.set("region", newFilters.region);
    if (newFilters.status) query.set("status", newFilters.status);
    query.set("page", newFilters.page ? newFilters.page.toString() : "1");

    const newQueryStr = query.toString();
    if (currentQuery === newQueryStr) return;

    router.push(`/mateBoard?${newQueryStr}`);
  };

  return (
    <MateBoardFilter
      cards={cards}
      totalPages={totalPages}
      currentPage={currentPage}
      onFilterChange={handleFilterChange}
      // 부모로부터 받은 초기값을 하위 컴포넌트로 전달합니다.
      initialRegion={initialRegion}
      initialStatus={initialStatus}
      initialKeyword={initialKeyword}
    />
  );
}
