"use client";

import React, { useEffect, useState, useRef } from "react";
import PlanCard from "@/components/plan/PlanCard";
import Image from "next/image";
import { createTravelPlace } from "@/apis/Schedule/PlanSchedule";
import { toast } from "react-hot-toast";
import type {
  CardData,
  PlanCardContainerProps,
  SearchResult,
  TravelPlaceRequest,
} from "@/types/Scheduleindex";

const getDayLabel = (dateStr: string) => {
  const day = new Date(dateStr).getDay();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[day];
};

const getDatesInRange = (start: string, end: string): string[] => {
  const date = new Date(start);
  const endDate = new Date(end);
  const dates: string[] = [];

  while (date <= endDate) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    dates.push(`${y}-${m}-${d}`);
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const PlanCardContainer: React.FC<PlanCardContainerProps> = ({
  onSearchResultsChange,
  startDate,
  endDate,
  scheduleId,
  dailyTravels,
  scheduleDayIds,
  activeDayIndex,
  onDayClick,
}) => {
  const [cardsMap, setCardsMap] = useState<Record<string, CardData[]>>({});
  const [nextId, setNextId] = useState<number>(1);
  const hasGenerated = useRef(false);

  const dateList = getDatesInRange(startDate, endDate);

  useEffect(() => {
    if (hasGenerated.current || dailyTravels.length === 0 || scheduleDayIds.length === 0) return;

    let currentNextId = nextId;
    const newCardsMap: Record<string, CardData[]> = {};

    dailyTravels.forEach((day) => {
      const dayIndex = scheduleDayIds.indexOf(day.scheduleDayId);
      const date = dateList[dayIndex];
      if (!date) return;

      newCardsMap[date] = day.travels.map((travel) => ({
        id: currentNextId++,
        placeName: travel.place_name,
        time: `${String(travel.hour).padStart(2, "0")}:${String(travel.minute).padStart(2, "0")}`,
        travelId: travel.travel_id,
        searchResult: {
          place_name: travel.place_name,
          category_name: travel.category_group_name,
          address_name: "",
          x: travel.x,
          y: travel.y,
          id: travel.id ?? "",
        },
      }));
    });

    setCardsMap(newCardsMap);
    setNextId(currentNextId);
    hasGenerated.current = true;
  }, [dailyTravels, scheduleDayIds]);

  useEffect(() => {
    const date = dateList[activeDayIndex];
    const currentCards = cardsMap[date] || [];
    const results = currentCards
      .filter((card) => card.searchResult !== null)
      .map((card) => card.searchResult!);
    onSearchResultsChange(results);
  }, [cardsMap, activeDayIndex]);

  const addCard = (date: string) => {
    const newCard: CardData = {
      id: nextId,
      placeName: "",
      searchResult: null,
    };
    setCardsMap((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), newCard],
    }));
    setNextId((prev) => prev + 1);
  };

  const updateCard = (
    date: string,
    id: number,
    newPlaceName: string,
    newSearchResult: SearchResult | null
  ) => {
    const updatedCardsForDate = (cardsMap[date] || []).map((card) =>
      card.id === id
        ? { ...card, placeName: newPlaceName, searchResult: newSearchResult }
        : card
    );
    const updatedCardsMap = { ...cardsMap, [date]: updatedCardsForDate };
    setCardsMap(updatedCardsMap);
  };

  const deleteCard = (date: string, id: number) => {
    const updatedCardsForDate = (cardsMap[date] || []).filter((card) => card.id !== id);
    const updatedCardsMap = { ...cardsMap, [date]: updatedCardsForDate };
    setCardsMap(updatedCardsMap);
  };

  const handleBookmarkClick = async (
    date: string,
    result: SearchResult,
    time: string
  ) => {
    const [hour, minute] = time.split(":");
    const dayIndex = dateList.indexOf(date);
    const scheduleDayId = scheduleDayIds[dayIndex];

    const body: TravelPlaceRequest = {
      scheduleDayId,
      hour,
      minute,
      id: result.id ?? "",
      place_name: result.place_name,
      category_group_name: result.category_name,
      x: result.x,
      y: result.y,
    };

    try {
      await createTravelPlace(scheduleId, body);
      toast.success("✅ 장소가 저장되었습니다!");
    } catch (err) {
      console.log(err)
      toast.error("❌ 장소 저장에 실패했습니다.");
    }
  };

  return (
    <div className="w-full h-[700px] overflow-y-auto overflow-x-hidden px-4 pb-10">
      {dateList.map((date, index) => {
        const dayLabel = getDayLabel(date);
        const formatted = date.replace(/-/g, ".");
        const cardList = cardsMap[date] ?? [];

        return (
          <div key={date} className="mb-10">
            <div
              onClick={() => onDayClick(index)}
              className="w-full flex items-baseline justify-between mb-4 cursor-pointer"
            >
              <p className="font-bold text-2xl text-customBlack-200 text-left">day{index + 1}</p>
              <p className="text-customGray-400 text-lg text-center">
                {formatted} ({dayLabel})
              </p>
              <p className="text-gray-600 font-semibold text-lg text-right">
                총 <span className="text-yellow-500">{cardList.length}</span>개의 일정
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              {cardList.map((card, idx) => (
                <div key={card.id} className="flex items-center px-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-400 text-white text-sm font-semibold shrink-0">
                    {idx + 1}
                  </div>
                  <div className="ml-4 w-full">
                    <PlanCard
                      placeName={card.placeName}
                      onPlaceNameChange={(value) =>
                        updateCard(date, card.id, value, card.searchResult)
                      }
                      onSearchResult={(result) =>
                        updateCard(date, card.id, result?.place_name ?? card.placeName, result)
                      }
                      searchResult={card.searchResult}
                      onDelete={() => deleteCard(date, card.id)}
                      onBookmarkClick={(result, time) => {
                        handleBookmarkClick(date, result, time);
                      }}
                      time={card.time}
                      travelId={card.travelId}
                      scheduleId={scheduleId}
                      scheduleDayId={scheduleDayIds[index]}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="ml-6 w-full">
              <div
                onClick={() => addCard(date)}
                className="text-black flex justify-center gap-3 items-center mt-4 font-bold cursor-pointer mb-10"
              >
                <Image src="/svg/squarePlus.svg" alt="add" width={20} height={20} />
                일정 추가
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlanCardContainer;
