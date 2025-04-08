"use client";

import React, { useEffect, useRef } from "react";
import { SearchResult } from "@/types/PlanSearchBarProps";

interface PlanMapProps {
  searchResults: SearchResult[];
}

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
        // mapContainerRef.current가 null이 아님을 확인하고 지도 생성
        if (mapContainerRef.current) {
          mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, options);
        }
      });
    } else {
      console.error("Kakao Maps API가 로드되지 않았거나, mapContainerRef가 null입니다.");
    }
  }, []);
  
  // 마커 및 폴리라인 업데이트
  useEffect(() => {
    if (!mapRef.current) return;
    // API load 보장 후에도 마커, 폴리라인 작업은 kakao.maps.load 내부 또는 이후에 실행되어야 합니다.
    window.kakao.maps.load(() => {
      // 기존 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // 각 검색 결과에 대해 마커 생성
      const positions = searchResults.map(
        (result) => new window.kakao.maps.LatLng(result.y, result.x)
      );

      positions.forEach((pos) => {
        const marker = new window.kakao.maps.Marker({ position: pos });
        marker.setMap(mapRef.current!);
        markersRef.current.push(marker);
      });

      // 기존 폴리라인 제거
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }

      // 2개 이상의 위치가 있으면 폴리라인 생성하여 연결
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

      // 지도 범위를 마커들에 맞게 조정
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
