'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface NavItem {
  id: string;
  label: string;
  shareOpen: boolean;
}

export default function CalendarNavTree() {
  const [items, setItems] = useState<NavItem[]>([
    { id: '1', label: '부산', shareOpen: false },
    { id: '2', label: '제주도', shareOpen: false },
    { id: '3', label: '인천', shareOpen: false },
  ]);
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('auto');

  const addItem = () => {
    const newItem: NavItem = {
      id: (items.length + 1).toString(),
      label: `캘린더 ${items.length + 1}`,
      shareOpen: false,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, items]);

  const toggleShare = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, shareOpen: !item.shareOpen } : item
      )
    );
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="p-4">
      <div className="-mx-20 mr-30 relative border border-gray-200 bg-white h-[700px] w-[343px] shadow-md rounded-lg overflow-hidden">
        <p
          onClick={addItem}
          className="relative font-semibold text-xl pl-8 pt-8 text-gray-800 select-none cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          + New calendar
        </p>

        <div className="flex justify-between pt-8 px-6 cursor-pointer" onClick={toggleCalendar}>
          <p className="font-semibold text-base text-gray-800 select-none">내 일정</p>
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
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 p-3 my-1 rounded-md hover:bg-gray-100 relative transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center gap-2 w-full pr-10">
                <Image src="/svg/calendar.svg" alt="calendar" width={14} height={13} className="cursor-pointer" />
                <span className="ml-1 font-semibold text-gray-800">{item.label}</span>
              </div>
              <div className="ml-auto flex gap-4 mr-4 relative z-20">
                <div
                  className="p-1 rounded-md cursor-pointer"
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
                    className="transition-transform duration-200 ease-in-out transform hover:scale-125"
                  />
                </div>
                <div className="p-1 rounded-md cursor-pointer" onMouseDown={handleClick}>
                  <Image
                    src="/svg/trash.svg"
                    alt="trash"
                    width={34}
                    height={24}
                    className="transition-transform duration-200 ease-in-out transform hover:scale-125"
                  />
                </div>
              </div>
              {item.shareOpen && (
                <div className="absolute top-10 left-20 p-2 bg-white shadow-md rounded-md z-50">
                  <p className="text-sm">공유 링크: https://example.com</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
