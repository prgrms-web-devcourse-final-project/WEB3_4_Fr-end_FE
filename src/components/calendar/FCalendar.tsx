"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DateClickArg } from '@fullcalendar/interaction';

export default function FCalendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateClick = (arg: DateClickArg) => {
    console.log("Clicked date: ", arg.dateStr);
    setIsModalOpen(true);
  };
  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="-mx-24 h-full w-full overflow-hidden">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        dateClick={(arg) => dateClick(arg)}  // 인자를 넘겨줌
        height="100%"
        contentHeight="auto"
        headerToolbar={{
          start: 'prev today next',
          center: 'title',
          end: 'dayGridMonth'
        }}
      />

      {/* 모달 */}
      {isModalOpen && (
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
              <div className="w-full p-2 border border-gray-300 rounded-md flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md" style={{ backgroundColor: '#3b82f6' }}></div>
                  <span className="text-gray-800">#3b82f6</span>
                </div>
                <span className="text-gray-500">100%</span>
              </div>
            </div>
          </div>

          {/* 일정 제목 */}
          <label className="block text-sm font-semibold mb-1">일정 제목</label>
          <input type="text" className="w-full p-2 mb-4 border border-gray-300 rounded-md" />

          {/* 날짜 선택 */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1">시작일</label>
              <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1">종료일</label>
              <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          {/* 색상 (점 세 개) */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-3 items-center ml-2">
              <span className="h-3 w-40 rounded-full" style={{ backgroundColor: '#3b82f6' }}></span>
              <span className="h-3 w-3 bg-gray-300 rounded-full"></span>
              <span className="h-3 w-3 bg-gray-300 rounded-full"></span>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4 mr-2">
              <Button onClick={closeModal} className="w-[90px] bg-customGray-100 text-customBlack-200 hover:bg-customGray-400 transition-transform duration-300 ease-in-out hover:scale-105 font-bold rounded-lg">취소</Button>
              <Button onClick={closeModal} className="rounded-lg w-[90px] font-bold bg-customBlack-300 transition-transform duration-300 ease-in-out hover:scale-105">확인</Button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
