"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiBookmark } from "react-icons/fi";
import { SearchIcon, Trash2Icon } from "lucide-react";
import type { PlanCardProps, KakaoPlace, SearchResult } from "@/types/Scheduleindex";

const PlanCard: React.FC<PlanCardProps> = ({
  placeName,
  onPlaceNameChange,
  onSearchResult,
  searchResult,
  onDelete,
}) => {
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
    <div>
      <div
        className="w-[92%] overflow-hidden shadow-md rounded-md grid grid-flow-col grid-rows-2 gap-4 p-4 border border-gray-300"
      >
        {/* 시간  */}
        <div className="row-span-2 flex items-center justify-center ">
          <input
            type="time"
            placeholder="00:00"
            className="w-full py-1 border border-white rounded-md text-center"
          />
        </div>

        {/* 검색창 */}
        <div className="col-span-2">
          <div className="flex items-center w-full pr-10">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={placeName}
              onChange={(e) => onPlaceNameChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border-none outline-none bg-transparent font-bold"
            />
            {/* 아이콘  */}
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={handleSearch} asChild>
                <span>
                  <SearchIcon className="w-4 h-4 max-w-full" />
                </span>
              </Button>
              <Button variant="ghost" size="icon" onClick={onDelete} asChild>
                <span>
                  <Trash2Icon className="w-4 h-4 max-w-full" />
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/*  카테고리 북마크 */}
        <div className="col-span-2 row-span-1 pr-10">
          <div className="flex justify-between items-center">
            <span>
              {searchResult?.category_name?.trim()
                ? searchResult.category_name
                : "카테고리"}
            </span>
            <Button variant="ghost" size="icon" onClick={handleBookmark} asChild>
              <span>
                <FiBookmark className="w-4 h-4 max-w-full" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
