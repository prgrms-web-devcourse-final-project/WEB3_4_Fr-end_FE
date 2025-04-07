"use client";

import React from "react";
import PlanCard from "@/components/plan/PlanCard";
import { PlanSearchBarProps } from "@/types/PlanSearchBarProps";
import { SearchResult } from "@/types/PlanSearchBarProps";

interface PlanSidebarProps extends PlanSearchBarProps {
  searchResult: SearchResult | null;
}

const PlanSidebar: React.FC<PlanSidebarProps> = ({
  placeName,
  onPlaceNameChange,
  onSearchResult,
  searchResult,
}) => {
  return (
    <div>
      <PlanCard
        placeName={placeName}
        onPlaceNameChange={onPlaceNameChange}
        onSearchResult={onSearchResult}
        searchResult={searchResult}
      />
      {/* 추가 사이드바 콘텐츠 */}
    </div>
  );
};

export default PlanSidebar;
