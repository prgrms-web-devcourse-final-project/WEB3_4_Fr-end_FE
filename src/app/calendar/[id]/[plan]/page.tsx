// app/page.tsx (또는 pages/index.tsx)
"use client";

import React, { useState } from "react";
import PlanHeader from "@/components/plan/PlanHeader";
import PlanCardContainer from "@/components/plan/PlanCardContainer";
import PlanMap from "@/components/plan/PlanMap";
import { SearchResult } from "@/types/PlanSearchBarProps";

export default function Page() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  return (
    <div>
      <PlanHeader />
      <div className="flex">
        <div className="w-1/3">
          <PlanCardContainer onSearchResultsChange={setSearchResults} />
        </div>
        <div className="w-2/3 h-[700px] pb-20 pl-4">
          <PlanMap searchResults={searchResults} />
        </div>
      </div>
    </div>
  );
}
