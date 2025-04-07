"use client";

import React, { useState, useEffect } from "react";
import PlanSidebar from "@/components/plan/PlanSideBar";
import PlanMap from "@/components/plan/PlanMap";
import { SearchResult } from "@/types/PlanSearchBarProps";

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  color: string;
}

const PlanContainer: React.FC = () => {
  const [placeName, setPlaceName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  // 캘린더 ID (실제 사용 시 동적으로 관리하거나 props로 전달할 수 있음)
  const calendarId = "1744013262538";

  useEffect(() => {
    const storedEvents = localStorage.getItem(`calendarEvents-${calendarId}`);
    if (storedEvents) {
      const parsedEvents: Event[] = JSON.parse(storedEvents);
      setEvents(parsedEvents);
    }
  }, [calendarId]);

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
      {/* 오른쪽 영역: 지도와 이벤트 목록 */}
      <div className="w-2/3">
        {/* 지도 영역 */}
        <div className="h-[80vh]">
          <PlanMap searchResult={searchResult} />
        </div>
        {/* 이벤트 목록 영역 */}
        <div className="mt-4 p-4 border rounded shadow bg-white">
          <h2 className="text-xl font-bold mb-4">이벤트 목록</h2>
          {events.length === 0 ? (
            <p>등록된 이벤트가 없습니다.</p>
          ) : (
            <ul>
              {events.map((ev) => (
                <li key={ev.id} className="mb-3 border p-2 rounded">
                  <p className="font-bold">{ev.title}</p>
                  <p>
                    <strong>시작일:</strong> {ev.start}
                  </p>
                  {ev.end && (
                    <p>
                      <strong>종료일:</strong> {ev.end}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanContainer;
