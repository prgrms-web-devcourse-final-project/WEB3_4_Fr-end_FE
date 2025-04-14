"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiBookmark } from "react-icons/fi";
import { SearchIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { handleDeleteTravel } from "@/utils/PlanEventHandlers";
import { updateTravelPlace } from "@/apis/Schedule/PlanSchedule";
import type {
  PlanCardProps,
  KakaoPlace,
  SearchResult,
} from "@/types/Scheduleindex";

const PlanCard: React.FC<PlanCardProps> = ({
  placeName,
  onPlaceNameChange,
  onSearchResult,
  searchResult,
  onDelete,
  onBookmarkClick,
  time,
  travelId,
  scheduleId,
  scheduleDayId,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeValue, setTimeValue] = useState(time || "12:00");

  useEffect(() => {
    if (time) setTimeValue(time);
  }, [time]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    if (!isLoaded || !window.kakao || !window.kakao.maps.services) {
      console.error("Kakao Maps 서비스 라이브러리가 로드되지 않았습니다.");
      onSearchResult(null);
      return;
    }
  
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(placeName, (data: KakaoPlace[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        const place = data[0];
        const result: SearchResult = {
          place_name: place.place_name,
          category_name: place.category_group_name,
          address_name: place.address_name,
          x: parseFloat(place.x),
          y: parseFloat(place.y),
        };

        onPlaceNameChange(result.place_name);
        onSearchResult(result);
      } else {
        onSearchResult(null);
      }
    });
  };

  const handleBookmark = async () => {
    if (!searchResult) {
      toast.error("❌ 장소 정보가 없습니다.");
      return;
    }

    const [hour, minute] = timeValue.split(":");
    const body = {
      scheduleDayId,
      hour,
      minute,
      id: searchResult.id ?? "",
      place_name: searchResult.place_name,
      category_group_name: searchResult.category_name,
      x: searchResult.x,
      y: searchResult.y,
    };

    try {
      if (!travelId) {
        if (onBookmarkClick) {
          await onBookmarkClick(searchResult, timeValue);
        }
      } else {
        await updateTravelPlace(scheduleId, travelId, body);
        toast.success("✏️ 장소 정보가 수정되었습니다.");
      }
    } catch (err) {
      console.log(err)
      toast.error("❌ 장소 저장 또는 수정 실패");
    }
  };

  const handleDeleteClick = async () => {
    if (!travelId) return;

    const ok = await handleDeleteTravel(scheduleId, travelId);
    if (ok) {
      toast.success("🗑️ 장소가 삭제되었습니다.");
      onDelete();
    } else {
      toast.error("❌ 삭제에 실패했습니다.");
    }
  };

  return (
    <div>
      <div className="w-full overflow-hidden shadow-md rounded-md p-4 border border-gray-300">
        <div className="grid grid-cols-[100px_1fr_auto] grid-rows-2 gap-4 items-center">
          <div className="row-span-2 flex items-center justify-center w-[113px] min-w-[113px] max-w-[130px]">
            <input
              type="time"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              className="w-full py-1 border border-white rounded-md text-center"
            />
          </div>

          <div className="flex items-center min-w-[150px]">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={placeName}
              onChange={(e) => onPlaceNameChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-2 border-none outline-none bg-transparent font-bold"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" onClick={handleSearch} asChild>
              <span>
                <SearchIcon className="w-4 h-4 max-w-full" />
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDeleteClick} asChild>
              <span>
                <Trash2Icon className="w-4 h-4 max-w-full" />
              </span>
            </Button>
          </div>

          <div className="col-span-2 flex justify-between items-center pr-10">
            <span className="ml-2">
              {searchResult?.category_name?.trim()
                ? searchResult.category_name
                : "카테고리"}
            </span>
            <Button variant="ghost" size="icon" onClick={handleBookmark} asChild>
              <span>
                <FiBookmark className="w-4 h-4 max-w-full" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
