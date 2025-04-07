"use client";

import React from "react";
import PlanCard from "@/components/plan/PlanCard";
import { PlanSearchBarProps } from "@/types/PlanSearchBarProps";

const PlanSidebar: React.FC<PlanSearchBarProps> = ({
  placeName,
  onPlaceNameChange,
  onSearchResult,
}) => {
  return (
    <div>
      <PlanCard
        placeName={placeName}
        onPlaceNameChange={onPlaceNameChange}
        onSearchResult={onSearchResult}
      />
      {/* 추가 사이드바 콘텐츠 */}
    </div>
  );
};

export default PlanSidebar;
