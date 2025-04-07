"use client";

import { useEffect, useState } from "react";
import MateSearch from "@/components/mateBoard/mateBoardMain/MateSearch";
import CategoryFilter from "@/components/mateBoard/mateBoardMain/CategoryFilter";
import MateCardList from "@/components/mateBoard/mateBoardMain/MateCardList";
import { useDebounce } from "@/hooks/useDebounce";
import type { MateCardData } from "@/types/MateCardData";
import PaginationControls from "@/components/mateBoard/mateBoardMain/PaginationControls";
import WritingButton from "@/components/mateBoard/mateBoardMain/WritingButton";

export default function MateBoardFilter({ cards }: { cards: MateCardData[] }) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("전국");
  const [category, setCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  const debouncedSearch = useDebounce(searchInput, 1000);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  const filtered = cards.filter((card) => {
    const matchesRegion = region === "전국" ? true : card.region === region;
    const matchesCategory =
      category === "전체"
        ? true
        : category === "모집중"
          ? card.recruitCount > 0
          : card.recruitCount === 0;

    const matchesSearch =
      card.title.includes(search) || card.description.includes(search);

    return matchesRegion && matchesCategory && matchesSearch;
  });

  //페이지네이션
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  //검색 결과 Debouncing, 검색 Submit 통합
  const handleSubmit = () => {
    setSearch(searchInput);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [region, category, search]);
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
        <MateCardList cards={paginated} />
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
