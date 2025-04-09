"use client";

import React, { useState } from "react";
import PlanCard from "@/components/plan/PlanCard";
import Image from "next/image";
import type { CardData, PlanCardContainerProps, SearchResult } from "@/app/types"; // ✅ 타입 import

const PlanCardContainer: React.FC<PlanCardContainerProps> = ({
  onSearchResultsChange,
}) => {
  const [cards, setCards] = useState<CardData[]>([
    { id: 1, placeName: "", searchResult: null },
  ]);
  const [nextId, setNextId] = useState<number>(2);

  const addCard = () => {
    setCards((prev) => [
      ...prev,
      { id: nextId, placeName: "", searchResult: null },
    ]);
    setNextId((prev) => prev + 1);
  };

  const updateCard = (
    id: number,
    newPlaceName: string,
    newSearchResult: SearchResult | null
  ) => {
    const updatedCards = cards.map((card) =>
      card.id === id
        ? { ...card, placeName: newPlaceName, searchResult: newSearchResult }
        : card
    );
    setCards(updatedCards);
    const results = updatedCards
      .filter((card) => card.searchResult !== null)
      .map((card) => card.searchResult!);
    onSearchResultsChange(results);
  };

  const deleteCard = (id: number) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    const results = updatedCards
      .filter((card) => card.searchResult !== null)
      .map((card) => card.searchResult!);
    onSearchResultsChange(results);
  };


  return (
    <div className="-mx-2 w-full h-[700px] overflow-y-auto overflow-x-hidden mb-20 pb-10">
      <div className="w-[92%] flex items-baseline justify-between mb-4">
        <p className="font-bold text-2xl text-customBlack-200 text-left">
          day1
        </p>
        <p className="text-customGray-400 text-lg text-center">
          2025.03.28 (금)
        </p>
        <p className="text-gray-600 font-semibold text-lg text-right">
          총 <span className="text-yellow-500">{cards.length}</span>개의 일정
        </p>
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-col gap-4 pt-2">
        {cards.map((card, idx) => (
          <div key={card.id} className="flex items-center">
            {/* 동그라미 */}
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-400 text-white text-sm font-semibold shrink-0">
              {idx + 1}
            </div>
            {/* 카드 */}
            <div className="ml-4 w-full">
              <PlanCard
                placeName={card.placeName}
                onPlaceNameChange={(value) =>
                  updateCard(card.id, value, card.searchResult)
                }
                onSearchResult={(result) =>
                  updateCard(card.id, card.placeName, result)
                }
                searchResult={card.searchResult}
                onDelete={() => deleteCard(card.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="ml-9 w-full">
        <div
          onClick={addCard}
          className="text-black flex justify-center gap-3 items-center mt-4 font-bold cursor-pointer mb-10"
        >
          <Image src="/svg/squarePlus.svg" alt="add" width={20} height={20} />
          일정 추가
        </div>
      </div>
    </div>
  );
};

export default PlanCardContainer;
