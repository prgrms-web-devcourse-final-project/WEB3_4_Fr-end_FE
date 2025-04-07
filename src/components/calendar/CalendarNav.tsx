"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  shareOpen: boolean;
}

export default function CalendarNavTree() {
  const router = useRouter();

  // 모든 Hook을 조건 없이 호출
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<NavItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('calendars');
      if (stored) return JSON.parse(stored);
    }
    const defaultItems: NavItem[] = [
      { id: '1', label: '부산', shareOpen: false },
      { id: '2', label: '제주도', shareOpen: false },
      { id: '3', label: '인천', shareOpen: false },
    ];
    if (typeof window !== 'undefined') localStorage.setItem('calendars', JSON.stringify(defaultItems));
    return defaultItems;
  });
  const [editingCalendarId, setEditingCalendarId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('auto');

  // Hook은 항상 최상위에 있으므로 조건 없이 선언
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('calendars', JSON.stringify(items));
    }
  }, [items, mounted]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, items]);

  // 함수 선언 (조건 없음)
  const addItem = () => {
    setItems(prevItems => {
      const newItem: NavItem = {
        id: (prevItems.length + 1).toString(),
        label: `캘린더 ${prevItems.length + 1}`,
        shareOpen: false,
      };
      return [...prevItems, newItem];
    });
  };

  const toggleCalendar = () => {
    setIsOpen(prev => !prev);
  };

  const toggleShare = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, shareOpen: !item.shareOpen } : item
      )
    );
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleItemClick = (id: string) => {
    router.push(`/calendar/${id}`);
  };

  const deleteCalendar = (id: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== id);
      localStorage.setItem('calendars', JSON.stringify(newItems));
      return newItems;
    });
    // 해당 캘린더 이벤트 삭제 (추후 백엔드 연동 시 API 호출로 변경)
    localStorage.removeItem(`calendarEvents-${id}`);
  };

  const handleEditComplete = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, label: editingLabel } : item
      )
    );
    setEditingCalendarId(null);
    setEditingLabel('');
  };

  // 렌더링은 모든 Hook이 호출된 후에 조건부로 처리
  if (!mounted) {
    return <div />;
  }

  return (
    <div className="p-4 select-none">
      <div className="-mx-20 mr-30 relative border border-gray-200 bg-white h-[700px] w-[343px] shadow-md rounded-lg overflow-hidden">
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
              className="flex items-center gap-2 p-3 my-1 rounded-md hover:bg-gray-100 transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-2 w-full pr-10">
                <Image src="/svg/calendar.svg" alt="calendar" width={14} height={13} className="cursor-pointer" />
                {editingCalendarId === item.id ? (
                  <input
                    type="text"
                    value={editingLabel}
                    onChange={(e) => setEditingLabel(e.target.value)}
                    onBlur={() => handleEditComplete(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleEditComplete(item.id);
                    }}
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
              <div className="ml-auto flex gap-4 mr-4 relative z-20">
                <div
                  className="p-1 cursor-pointer"
                  onClick={(e) => {
                    handleClick(e);
                    toggleShare(item.id);
                  }}
                >
                  <Image
                    src="/svg/share.svg"
                    alt="share"
                    width={30}
                    height={24}
                    className="transition-transform duration-200 ease-in-out hover:scale-125"
                  />
                </div>
                <div
                  className="p-1 cursor-pointer"
                  onClick={(e) => {
                    handleClick(e);
                    deleteCalendar(item.id);
                  }}
                >
                  <Image
                    src="/svg/trash.svg"
                    alt="trash"
                    width={34}
                    height={24}
                    className="transition-transform duration-200 ease-in-out hover:scale-125"
                  />
                </div>
              </div>
              {item.shareOpen && (
                <div className="absolute top-10 left-20 p-2 bg-white shadow-md rounded-md z-50">
                  <p className="text-sm">
                    공유 링크: {`${window.location.origin}/calendar/${item.id}`}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
