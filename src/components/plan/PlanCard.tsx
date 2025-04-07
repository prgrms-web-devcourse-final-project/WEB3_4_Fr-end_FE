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
  return (
    <div>
      {/* PlanSearchBar를 포함한 카드 */}
      <PlanSearchBar
        placeName={placeName}
        onPlaceNameChange={onPlaceNameChange}
        onSearchResult={onSearchResult}
      />
    </div>
  );
};

export default PlanCard;
