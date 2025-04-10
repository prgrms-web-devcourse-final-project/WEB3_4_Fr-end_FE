"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { fetchCalendars } from '@/apis/Schedule/CalendarNav';
import type { NavItem } from "@/types/Scheduleindex";
import { useAuthStore } from '@/store/useAuthStore';
import CalendarItem from "@/components/calendar/CalendarNavItem";
import { addNewCalendar, copyCalendarUrl, deleteCalendar, editCalendarTitle } from '@/utils/calendarHandlers';

export default function CalendarNav() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null); // 드롭다운 DOM 참조
  const userId = useAuthStore((state) => state.user?.id);   // 사용자 ID 가져오기
  const [items, setItems] = useState<NavItem[]>([]); // 전체 캘린더 목록
  const [editingCalendarId, setEditingCalendarId] = useState<string | null>(null); // 캘린더 이름 수정
  const [editingLabel, setEditingLabel] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true); // 드롭다운 열림/닫힘
  const [contentHeight, setContentHeight] = useState<string>('auto');  // 드롭다운 높이 애니메이션

  // 캘린더 목록 불러오기 + 기본 캘린더 생성
  useEffect(() => {
    const init = async () => {
      try {
        const calendarList = await fetchCalendars();
        const navItems: NavItem[] = calendarList.map(item => ({
          id: item.id.toString(),
          label: item.calendarTitle,
          shareOpen: false,
        }));
        setItems(navItems);

        // 캘린더가 하나도 없으면 기본 캘린더 생성
        if (navItems.length === 0 && userId) {
          await addNewCalendar(userId, setItems);
        }
      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, [userId]);

  // 드롭다운 토글 시 높이 갱신
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, items]);

  //  캘린더 생성
  const handleAdd = () => {
    if (!userId) return;
    addNewCalendar(userId, setItems);
  };

  //  캘린더 URL 복사
  const handleCopyUrl = (id: string) => {
    copyCalendarUrl(id);
  };

  //  캘린더 항목 클릭 시 해당 캘린더 페이지로 이동
  const handleItemClick = (id: string) => {
    router.push(`/calendar/${id}`);
  };

  //  캘린더 삭제
  const handleDeleteCalendar = (id: string) => {
    if (!userId) return;
    deleteCalendar(id, userId, setItems);
  };

  //  캘린더 이름 수정 완료
  const handleEditComplete = (id: string) => {
    if (!userId) return;
    editCalendarTitle(id, userId, editingLabel, setItems, () => {
      setEditingCalendarId(null);
      setEditingLabel('');
    });
  };

  return (
    <div className="p-4 select-none">
      <div className="relative border border-gray-200 bg-white h-[700px] w-[343px] shadow-md rounded-lg overflow-hidden">

        {/* 새 캘린더 추가 버튼 */}
        <p
          onClick={handleAdd}
          className="relative font-semibold text-xl pl-8 pt-8 text-gray-800 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
        >
          + New calendar
        </p>

        {/*  드롭다운 헤더 */}
        <div className="flex justify-between pt-8 px-6 cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>
          <p className="font-semibold text-base text-gray-800">내 일정</p>
          <Image
            src={isOpen ? "/svg/downArrow.svg" : "/svg/upArrow.svg"}
            alt="toggle"
            width={18}
            height={20}
          />
        </div>

        {/* 캘린더 리스트 */}
        <div
          ref={contentRef}
          style={{
            height: contentHeight,
            minHeight: isOpen ? 'auto' : '0',
            transition: 'height 0.7s ease-in-out, opacity 1s ease-in-out',
            opacity: isOpen ? 1 : 0,
          }}
          className={`p-4 ${items.length > 10 ? 'overflow-y-auto max-h-[600px]' : ''} scroll-smooth`}
        >
          {items.map((item) => (
            <CalendarItem
              key={item.id}
              item={item}
              editingCalendarId={editingCalendarId}
              editingLabel={editingLabel}
              setEditingCalendarId={setEditingCalendarId}
              setEditingLabel={setEditingLabel}
              onEditComplete={handleEditComplete}
              onDelete={handleDeleteCalendar}
              onCopyUrl={handleCopyUrl}
              onClick={handleItemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
