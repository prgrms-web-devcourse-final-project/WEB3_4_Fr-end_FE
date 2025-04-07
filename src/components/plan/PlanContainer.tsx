"use client";

import React, { useState } from "react";
import PlanSidebar from "@/components/plan/PlanSideBar";
import PlanMap from "@/components/plan/PlanMap";
import { SearchResult } from "@/types/PlanSearchBarProps";

const PlanContainer: React.FC = () => {
  const [placeName, setPlaceName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  return (
    <div className="flex gap-4">
      {/* 왼쪽 사이드바 */}
      <div className="w-1/3">
        <PlanSidebar
          placeName={placeName}
          onPlaceNameChange={setPlaceName}
          onSearchResult={setSearchResult}
          searchResult={searchResult}
        />
      </div>
      {/* 오른쪽 지도 영역 */}
      <div className="w-2/3 h-[80vh]">
        <PlanMap searchResult={searchResult} />
      </div>
    </div>
  );
};

export default PlanContainer;
