"use client";

import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { SearchResult } from "@/types/PlanSearchBarProps";

export interface PlanMapProps {
  searchResult: SearchResult | null;
}

const PlanMap: React.FC<PlanMapProps> = ({ searchResult }) => {
  // 지도 중심 좌표: 검색 결과가 있으면 해당 좌표, 없으면 기본 좌표(서울)
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });

  useEffect(() => {
    if (searchResult) {
      setCenter({
        lat: searchResult.y,
        lng: searchResult.x,
      });
    }
  }, [searchResult]);

  return (
    <Map
      center={center}
      className="w-full h-full"
      level={3}
    >
      {searchResult && (
        <MapMarker position={{ lat: searchResult.y, lng: searchResult.x }}>
          <div style={{ padding: "5px", color: "#000" }}>
            {searchResult.place_name}
          </div>
        </MapMarker>
      )}
    </Map>
  );
};

export default PlanMap;
