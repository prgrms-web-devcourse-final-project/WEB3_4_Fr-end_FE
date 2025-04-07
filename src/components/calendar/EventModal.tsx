'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface EventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  eventTitle: string;
  setEventTitle: (value: string) => void;
  eventType: string;
  setEventType: (value: string) => void;
  eventColor: string;
  setEventColor: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  addEvent: () => void;
}

export default function EventModal({
  isOpen,
  closeModal,
  eventTitle,
  setEventTitle,
  eventType,
  setEventType,
  eventColor,
  setEventColor,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  addEvent,
}: EventModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[520px]">

        {/* 헤더 */}
        <div className="flex items-center -mt-2">
          <div className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-lg mr-3">
            <Image src="/svg/calendar.svg" alt="calendar" width={24} height={24} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">일정 생성하기</h2>
            <p className="text-sm text-gray-500">친구와 공유할 수 있는 여행 일정을 만들어보세요!</p>
          </div>
        </div>

        {/* 가로로 꽉 찬 선 */}
        <div className="mt-4 -mx-8 bg-gray-300 h-[2px] mb-4"></div>

        {/* 이벤트 타입과 색상 선택 */}
        <div className="flex gap-4 mb-5">
          <div className="w-1/2">
            <label className="block text-sm mb-1 font-semibold">이벤트 타입</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option>친구와 함께</option>
              <option>일반 일정</option>
              <option>여행</option>
              <option>공부</option>
              <option>운동</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">색상</label>
            <div
              className="w-full p-2 border border-gray-300 rounded-md flex items-center justify-between cursor-pointer"
              onClick={() => document.getElementById('colorPicker')?.click()}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md"
                  style={{ backgroundColor: eventColor }}
                ></div>
                <span className="text-gray-800">{eventColor}</span>
              </div>
              <span className="text-gray-500">100%</span>
            </div>
            <input
              id="colorPicker"
              type="color"
              value={eventColor}
              onChange={(e) => setEventColor(e.target.value)}
              className="absolute opacity-0 w-0 h-0"
            />
          </div>
        </div>

        {/* 일정 제목 */}
        <label className="block text-sm font-semibold mb-1">일정 제목</label>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {/* 날짜 선택 */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">종료일</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        <div className="flex gap-4 mr-2 justify-end">
          <Button onClick={closeModal} className='w-[90px] bg-customGray-100 text-customBlack-200 hover:bg-customGray-400'>취소</Button>
          <Button onClick={addEvent} className="rounded-lg w-[90px] font-bold bg-customBlack-300">확인</Button>
        </div>
      </div>
    </div>
  );
}
