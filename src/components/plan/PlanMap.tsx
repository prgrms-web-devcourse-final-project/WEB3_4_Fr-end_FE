"use client";

import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { SearchResult } from "@/types/PlanSearchBarProps";

interface PlanMapProps {
  searchResult: SearchResult | null;
}

const PlanMap: React.FC<PlanMapProps> = ({ searchResult }) => {
  return (
    <Map
      center={{
        lat: searchResult ? searchResult.y : 37.5665,
        lng: searchResult ? searchResult.x : 126.978,
      }}
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
