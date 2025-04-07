"use client";

import React, { useState } from "react";
import PlanSearchBar from "@/components/plan/PlanSearchBar";
import { SearchResult } from "@/types/PlanSearchBarProps";
import { Button } from "@/components/ui/button";
import { FiBookmark } from "react-icons/fi";

interface PlanCardProps {
  placeName: string;
  onPlaceNameChange: (newPlaceName: string) => void;
  onSearchResult: (result: SearchResult | null) => void;
  searchResult: SearchResult | null;
}

const PlanCard: React.FC<PlanCardProps> = ({
  placeName,
  onPlaceNameChange,
  onSearchResult,
  searchResult,
}) => {
  //div CSS active: 상태 유지
  const [clicked, setClicked] = useState(false);

  const handleDelete = () => {
    alert("카드삭제");
  };

  const handleClick = () => {
    alert("북마크");
  };
  return (
    <div
      onClick={() => setClicked((prev) => !prev)}
      className={`w-full max-w-md shadow-md rounded-md grid grid-flow-col grid-rows-2 gap-4 p-2 ${
        clicked ? "border-2 border-amber-300" : "border border-gray-300"
      }`}
    >
      {/* 시간 */}
      <div className="row-span-2 flex items-center justify-center">
        <input
          type="text"
          placeholder="시간"
          className="w-24 max-w-full px-2 py-1 border border-white rounded-md text-center"
        />
      </div>

      {/* 검색창 영역 */}
      <div className="col-span-2">
        <PlanSearchBar
          placeName={placeName}
          onPlaceNameChange={onPlaceNameChange}
          onSearchResult={onSearchResult}
          onDelete={handleDelete}
        />
      </div>

      {/* 하단 영역: 카테고리와 버튼을 양쪽 끝에 배치 */}
      <div className="col-span-2 row-span-1">
        <div className="flex justify-between items-center">
          <span>
            {searchResult?.category_name?.trim()
              ? searchResult.category_name
              : "카테고리 정보없음"}
          </span>
          <Button variant="ghost" size="icon" onClick={handleClick} asChild>
            <span>
              <FiBookmark />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
