"use client";

import React from "react";
import PlanSearchBar from "@/components/plan/PlanSearchBar";
import { SearchResult } from "@/types/PlanSearchBarProps";

interface PlanCardProps {
  placeName: string;
  onPlaceNameChange: (newPlaceName: string) => void;
  onSearchResult: (result: SearchResult | null) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  placeName,
  onPlaceNameChange,
  onSearchResult,
}) => {
  const handleDelete = () => {
    alert("카드삭제");
  };
  return (
    <div className="w-80 grid grid-flow-col grid-rows-3 gap-4">
      {/* PlanSearchBar를 포함한 카드 */}
      <div className="row-span-3">시간</div>
      <div className="col-span-2">
        <PlanSearchBar
          placeName={placeName}
          onPlaceNameChange={onPlaceNameChange}
          onSearchResult={onSearchResult}
          onDelete={handleDelete}
        />
      </div>
      <div className="col-span-2 row-span-2 flex-col">
        <div className="flex justify-between items-center">
          <span>카테고리</span>
          <span>버튼</span>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
