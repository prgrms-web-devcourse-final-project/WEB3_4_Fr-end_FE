"use client";

import React, { useState } from "react";
import PlanCard from "@/components/plan/PlanCard";
import PlanMap from "@/components/plan/PlanMap";
import { SearchResult } from "@/types/PlanSearchBarProps";
import PlanHeader from "@/components/plan/PlanHeader";
import PlzTest from "@/components/plan/PlzTest";

const PlanContainer: React.FC = () => {
  const [placeName, setPlaceName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const handleDelete = () => {
    alert("삭제!");
  };

  return (
    <div>
      <PlanHeader />
    <div className="flex gap-4">
      <div className="w-1/3">
        <PlanCard
          placeName={placeName}
          onPlaceNameChange={setPlaceName}
          onSearchResult={setSearchResult}
          searchResult={searchResult}
          onDelete={handleDelete}
        />
        <PlzTest />
      </div>
      <div className="w-2/3 h-[700px] pb-10">
        <PlanMap searchResult={searchResult} />
      </div>
    </div>
    </div>
  );
};

export default PlanContainer;
