"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiBookmark } from "react-icons/fi";
import { SearchIcon, Trash2Icon } from "lucide-react";
import { PlanSearchBarProps, SearchResult } from "@/types/PlanSearchBarProps";

export interface KakaoPlace {
  place_name: string;
  category_group_name: string;
  address_name: string;
  x: string;
  y: string;
}

export interface PlanCardProps extends PlanSearchBarProps {
  searchResult: SearchResult | null;
  onDelete: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  placeName,
  onPlaceNameChange,
  onSearchResult,
  searchResult,
  onDelete,
}) => {
  const [clicked, setClicked] = useState(false);

  // 카카오 맵 서비스가 로드되었는지 확인
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    } else {
      console.error("Kakao Maps SDK가 로드되지 않았습니다.");
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!isLoaded || !window.kakao || !window.kakao.maps.services) {
      console.error("Kakao Maps 서비스 라이브러리가 로드되지 않았습니다.");
      onSearchResult(null);
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(placeName, (data: KakaoPlace[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        const place = data[0];
        const result: SearchResult = {
          place_name: place.place_name,
          category_name: place.category_group_name,
          address_name: place.address_name,
          x: parseFloat(place.x),
          y: parseFloat(place.y),
        };
        onSearchResult(result);
      } else {
        onSearchResult(null);
      }
    });
  };

  const handleBookmark = () => {
    alert("북마크!");
  };

  return (
    <div
      onClick={() => setClicked((prev) => !prev)}
      className={`w-full max-w-md shadow-md rounded-md grid grid-flow-col grid-rows-2 gap-4 p-2 ${
        clicked ? "border-2 border-amber-300" : "border border-gray-300"
      }`}
    >
      {/* 시간 입력 영역 */}
      <div className="row-span-2 flex items-center justify-center">
        <input
          type="text"
          placeholder="시간"
          className="w-24 max-w-full px-2 py-1 border border-white rounded-md text-center"
        />
      </div>

      {/* 검색창 영역 */}
      <div className="col-span-2">
        <div className="flex items-center border-b border-gray-300 pb-2">
          <input
            type="text"
            placeholder="장소 이름을 입력하세요"
            value={placeName}
            onChange={(e) => onPlaceNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-none outline-none bg-transparent font-bold"
          />
          <Button variant="ghost" size="icon" onClick={handleSearch} asChild>
            <span>
              <SearchIcon className="w-4 h-4" />
            </span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} asChild>
            <span>
              <Trash2Icon className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>

      {/* 하단 영역: 카테고리 정보와 북마크 버튼 */}
      <div className="col-span-2 row-span-1">
        <div className="flex justify-between items-center">
          <span>
            {searchResult?.category_name?.trim()
              ? searchResult.category_name
              : "카테고리 정보없음"}
          </span>
          <Button variant="ghost" size="icon" onClick={handleBookmark} asChild>
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
