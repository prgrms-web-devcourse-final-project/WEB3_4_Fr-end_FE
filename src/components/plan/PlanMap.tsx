"use client";

import React, { useEffect, useRef } from "react";
import type { PlanMapProps } from "@/types/Scheduleindex";

const PlanMap: React.FC<PlanMapProps> = ({ searchResults }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const polylineRef = useRef<kakao.maps.Polyline | null>(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapContainerRef.current) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.5546, 126.9707),
          level: 10,
        };
        if (mapContainerRef.current) {
          mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, options);
        }
      });
    } else {
      console.error("SDK가 로드되지 않았습니다");
    }
  }, []);
  
  useEffect(() => {
    if (!mapRef.current) return;

    window.kakao.maps.load(() => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      const positions = searchResults.map(
        (result) => new window.kakao.maps.LatLng(result.y, result.x)
      );

      positions.forEach((pos) => {
        const marker = new window.kakao.maps.Marker({ position: pos });
        marker.setMap(mapRef.current!);
        markersRef.current.push(marker);
      });

      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }

      if (positions.length >= 2) {
        const polyline = new window.kakao.maps.Polyline({
          path: positions,
          strokeWeight: 5,
          strokeColor: "#FF0000",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });
        polyline.setMap(mapRef.current!);
        polylineRef.current = polyline;
      }

      if (positions.length > 0) {
        const bounds = new window.kakao.maps.LatLngBounds();
        positions.forEach((pos) => bounds.extend(pos));
        mapRef.current!.setBounds(bounds);
      }
    });
  }, [searchResults]);

  return <div ref={mapContainerRef} style={{ width: "98%", height: "100%" }} />;
};

export default PlanMap;
