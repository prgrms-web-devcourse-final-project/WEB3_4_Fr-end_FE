"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import PlanHeader from "@/components/plan/PlanHeader";
import PlanCardContainer from "@/components/plan/PlanCardContainer";
import PlanMap from "@/components/plan/PlanMap";
import { getPlanEventData } from "@/utils/PlanEventHandlers";
import { fetchScheduleTravels } from "@/apis/Schedule/PlanSchedule";
import type {
  SearchResult,
  DailyTravelResponse,
} from "@/types/Scheduleindex";

export default function Page() {
  const params = useParams();
  const calendarId = params.id as string;
  const scheduleId = params.plan as string;

  const [scheduleTitle, setScheduleTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyTravels, setDailyTravels] = useState<DailyTravelResponse[]>([]);
  const [scheduleDayIds, setScheduleDayIds] = useState<number[]>([]);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // 🔧 useCallback으로 감싼 핸들러
  const handleSearchResultsChange = useCallback((results: SearchResult[]) => {
    setSearchResults(results);
  }, []);

  useEffect(() => {
    const loadSchedule = async () => {
      const data = await getPlanEventData(scheduleId);
      if (data) {
        setScheduleTitle(data.scheduleTitle);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
      }
    };
    loadSchedule();
  }, [scheduleId]);

  useEffect(() => {
    const loadTravels = async () => {
      try {
        const data = await fetchScheduleTravels(scheduleId);
        setDailyTravels(data.dailyTravels);
        setScheduleDayIds(data.scheduleDayIds);
      } catch (error) {
        console.error(error);
      }
    };
    loadTravels();
  }, [scheduleId]);

  return (
    <div className="h-screen">
      <PlanHeader
        calendarId={calendarId}
        title={scheduleTitle}
        startDate={startDate}
        endDate={endDate}
      />

      <div className="flex h-[calc(100vh-98px)] overflow-hidden">
        <div className="w-1/3 h-full overflow-y-auto pr-1">
          <PlanCardContainer
            calendarId={calendarId}
            scheduleId={scheduleId}
            startDate={startDate}
            endDate={endDate}
            dailyTravels={dailyTravels}
            scheduleDayIds={scheduleDayIds}
            activeDayIndex={activeDayIndex}
            onDayClick={setActiveDayIndex}
            onSearchResultsChange={handleSearchResultsChange} // ✅ 수정된 부분
          />
        </div>
        <div className="w-2/3 h-full min-w-0 pl-4">
          <PlanMap searchResults={searchResults} />
        </div>
      </div>
    </div>
  );
}
