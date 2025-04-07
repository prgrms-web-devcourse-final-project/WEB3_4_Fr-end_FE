"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { PlanSearchBarProps, SearchResult } from "@/types/PlanSearchBarProps";

export interface KakaoPlace {
  place_name: string;
  category_group_name: string;
  address_name: string;
  x: string;
  y: string;
}

const PlanSearchBar: React.FC<PlanSearchBarProps> = ({
  placeName,
  onPlaceNameChange,
  onSearchResult,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Kakao Maps SDK 로드
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        console.log("Kakao Maps SDK Loaded");
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
        console.log("검색 결과:", result);
        onSearchResult(result);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        console.error("검색 결과가 없습니다.");
        onSearchResult(null);
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        console.error("검색 중 오류가 발생했습니다.");
        onSearchResult(null);
      } else {
        console.error("알 수 없는 오류:", status);
        onSearchResult(null);
      }
    });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="장소 이름을 입력하세요"
          value={placeName}
          onChange={(e) => onPlaceNameChange(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ marginBottom: "10px", padding: "5px" }}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSearch}
          style={{ marginLeft: "5px" }}
        >
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
};

export default PlanSearchBar;
