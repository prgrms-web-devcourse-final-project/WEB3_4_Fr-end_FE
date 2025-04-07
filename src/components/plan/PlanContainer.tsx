"use client";

import React, { useState } from "react";
import PlanSidebar from "@/components/plan/PlanSideBar";
import PlanMap from "@/components/plan/PlanMap";
import { SearchResult } from "@/types/PlanSearchBarProps";

const PlanContainer: React.FC = () => {
  const [placeName, setPlaceName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  return (
    <div className="flex">
      {/* 왼쪽 사이드바 */}
      <div className="w-1/4">
        <PlanSidebar
          placeName={placeName}
          onPlaceNameChange={setPlaceName}
          onSearchResult={setSearchResult}
        />
      </div>
      {/* 오른쪽 지도 영역 */}
      <div className="w-3/4">
        <PlanMap searchResult={searchResult} />
      </div>
    </div>
  );
};

export default PlanContainer;
