"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { fetchCalendars, createCalendar, deleteCalendarById, updateCalendar } from '@/apis/Schedule/CalendarNav';
import type { NavItem } from "@/types/Scheduleindex";
import { useAuthStore } from '@/store/useAuthStore';

export default function CalendarNav() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<NavItem[]>([]);
  const [nextId, setNextId] = useState<number>(2);
  const [editingCalendarId, setEditingCalendarId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('auto');
  const [copyMessage, setCopyMessage] = useState("");
  const userId = useAuthStore((state) => state.user?.id);

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
  
        const hasId1 = navItems.some(item => item.id === '1');
        if (!hasId1 && userId) {
          const created = await createCalendar("캘린더", userId); // ✅ 여기서도 userId 전달
          const newItem: NavItem = {
            id: created.id.toString(),
            label: created.calendarTitle,
            shareOpen: false
          };
          setItems(prev => [...prev, newItem]);
        }
  
        const maxId = navItems.reduce((max, item) => {
          const idNum = parseInt(item.id, 10);
          return idNum > max ? idNum : max;
        }, 0);
        setNextId(maxId + 1);
  
        setMounted(true);
      } catch (err) {
        console.error("캘린더 초기화 오류", err);
      }
    };
    init();
  }, [userId]); 

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, items]);

const addItem = async () => {
  try {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const created = await createCalendar(`캘린더 ${nextId}`, userId); // ✅ userId 전달
    setItems(prev => [...prev, {
      id: created.id.toString(),
      label: created.calendarTitle,
      shareOpen: false
    }]);
    setNextId(prev => prev + 1);
  } catch (err) {
    console.error("캘린더 생성 실패", err);
  }
};

  const toggleCalendar = () => {
    setIsOpen(prev => !prev);
  };

  const handleCopyUrl = (id: string) => {
    const url = `${window.location.origin}/calendar/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopyMessage("URL이 복사되었습니다!");
        setTimeout(() => setCopyMessage(""), 2000);
      })
      .catch(err => {
        console.error("URL 복사 실패", err);
      });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleItemClick = (id: string) => {
    router.push(`/calendar/${id}`);
  };

 const handleDeleteCalendar = async (id: string) => {
  try {
    if (!userId) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    await deleteCalendarById(id, userId); // ✅ userId 함께 전달
    setItems(prev => prev.filter(item => item.id !== id));
  } catch (err) {
    console.error("캘린더 삭제 실패", err);
  }
};

const handleEditComplete = async (id: string) => {
  console.log("🧩 캘린더 이름 수정 시도");
  console.log("📌 calendarId:", id);
  console.log("📌 userId:", userId);
  console.log("📌 새로운 이름:", editingLabel);

  try {
    if (!userId) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    const now = new Date().toISOString(); // 임시 시간
    await updateCalendar(id, userId, {
      calendarTitle: editingLabel,
      startDate: now,
      endDate: now,
      alertTime: now,
      note: ""
    });

    // UI 업데이트
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, label: editingLabel } : item
      )
    );
    setEditingCalendarId(null);
    setEditingLabel("");
  } catch (err) {
    console.error("캘린더 수정 실패", err);
  }
};

  if (!mounted) return <div />;
  return (
    <div className="p-4 select-none">
      <div className="relative border border-gray-200 bg-white h-[700px] w-[343px] shadow-md rounded-lg overflow-hidden">
        <p
          onClick={addItem}
          className="relative font-semibold text-xl pl-8 pt-8 text-gray-800 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
        >
          + New calendar
        </p>

        <div className="flex justify-between pt-8 px-6 cursor-pointer" onClick={toggleCalendar}>
          <p className="font-semibold text-base text-gray-800">내 일정</p>
          {isOpen ? (
            <Image src="/svg/downArrow.svg" alt="downArrow" width={18} height={20} />
          ) : (
            <Image src="/svg/upArrow.svg" alt="upArrow" width={18} height={20} />
          )}
        </div>

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
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="flex items-center gap-2 p-3 my-1 rounded-md bg-white transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center gap-2 w-full pr-10">
                <Image src="/svg/calendar.svg" alt="calendar" width={14} height={13} className="cursor-pointer" />
                {editingCalendarId === item.id ? (
                  <input
                    type="text"
                    value={editingLabel}
                    onChange={(e) => setEditingLabel(e.target.value)}
                    onBlur={() => handleEditComplete(item.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleEditComplete(item.id); }}
                    className="ml-1 font-semibold text-gray-800 border-b border-gray-400 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <span
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setEditingCalendarId(item.id);
                      setEditingLabel(item.label);
                    }}
                    className="ml-1 font-semibold text-gray-800"
                  >
                    {item.label}
                  </span>
                )}
              </div>
              <div className="ml-auto flex gap-4 mr-4 relative">
                <div className="p-1 cursor-pointer" onClick={(e) => { handleClick(e); handleCopyUrl(item.id); }}>
                  <Image src="/svg/share.svg" alt="share" width={30} height={24} className="transition-transform duration-200 ease-in-out hover:scale-125" />
                </div>
                <div className="p-1 cursor-pointer" onClick={(e) => { handleClick(e); handleDeleteCalendar(item.id); }}>
        <Image src="/svg/trash.svg" alt="trash" width={34} height={24} className="transition-transform duration-200 ease-in-out hover:scale-125" />
      </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {copyMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-md">
          {copyMessage}
        </div>
      )}
    </div>
  );
}
