"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { CalendarModalProps } from "@/types/Scheduleindex";

export default function CalendarModal({
  isOpen,
  eventTitle,
  setEventTitle,
  eventColor,
  setEventColor,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  addNewEvent,
  closeModal,
}: CalendarModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[520px]">
        <div className="flex items-center -mt-2">
          <div className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-lg mr-3">
            <Image src="/svg/calendar.svg" alt="calendar" width={24} height={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">일정 생성하기</h2>
            <p className="text-sm text-gray-500">
              친구와 공유할 수 있는 여행 일정을 만들어보세요!
            </p>
          </div>
        </div>
        <div className="mt-4 -mx-8 bg-gray-300 h-[2px] mb-4" />
        <div className="flex gap-4 mb-5">
          <div className="w-1/2">
            <label className="block text-sm mb-1 font-semibold">이벤트 타입</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>친구와 함께</option>
              <option>일반 일정</option>
              <option>여행</option>
              <option>공부</option>
              <option>운동</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">색상</label>
            <div className="w-full p-2 border border-gray-300 rounded-md flex items-center">
              <input
                type="color"
                value={eventColor}
                onChange={(e) => setEventColor(e.target.value)}
                className="w-6 h-6 p-0 border-0 mr-2"
                style={{ WebkitAppearance: "none", appearance: "none" }}
              />
              <span className="text-gray-800">{eventColor}</span>
            </div>
          </div>
        </div>
        <label className="block text-sm font-semibold mb-1">일정 제목</label>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">종료일</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="flex gap-3 items-center ml-2">
            <span
              className="h-3 w-40 rounded-full"
              style={{ backgroundColor: eventColor }}
            />
            <span className="h-3 w-3 bg-gray-300 rounded-full" />
            <span className="h-3 w-3 bg-gray-300 rounded-full" />
          </div>
          <div className="flex gap-4 mr-2">
            <Button
              onClick={closeModal}
              className="w-[90px] bg-gray-100 text-gray-800 hover:bg-gray-400 transition-transform duration-300 ease-in-out hover:scale-105 font-bold rounded-lg"
            >
              취소
            </Button>
            <Button
              onClick={addNewEvent}
              className="w-[90px] rounded-lg font-bold bg-black transition-transform duration-300 ease-in-out hover:scale-105"
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
