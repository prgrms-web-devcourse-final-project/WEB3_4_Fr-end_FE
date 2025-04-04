'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';
import Image from 'next/image';

interface NavItem {
  id: string;
  label: string;
}

export default function CalendarNavTree() {
  const [items, setItems] = useState<NavItem[]>([
    { id: '1', label: '부산' },
    { id: '2', label: '제주도' },
    { id: '3', label: '인천' },
  ]);
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('auto');

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const updatedItems = arrayMove(items, oldIndex, newIndex);
      setItems(updatedItems);
    }
  };

  const addItem = () => {
    const newItem = {
      id: (items.length + 1).toString(),
      label: `캘린더 ${items.length + 1}`,
    };
    setItems([...items, newItem]);
  };

  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, items]);

  // 캘린더 항목 컴포넌트
  const CalendarNavItem = ({ id, label }: NavItem) => {
    const [shareOpen, setShareOpen] = useState(false);
    const { listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const toggleShare = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShareOpen((prev) => !prev);
    };

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-2 p-3 my-1 rounded-md hover:bg-customGray-100 relative transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        <div {...listeners} className="flex items-center gap-2 cursor-grab w-full pr-10">
          <Image src="/svg/calendar.svg" alt="calendar" width={14} height={13} className="cursor-pointer" />
          <span className="ml-1 font-semibold text-customBlack-200">{label}</span>
        </div>
        <div className="ml-auto flex gap-4 mr-4 relative z-20">
          <div
            className="p-1 rounded-md cursor-pointer"
            onClick={toggleShare}
            onMouseDown={handleClick}
          >
            <Image
              src="/svg/share.svg"
              alt="share"
              width={30}
              height={24}
              className="transition-transform duration-200 ease-in-out transform hover:scale-125"
            />
          </div>
          <div
            className="p-1 rounded-md cursor-pointer"
            onMouseDown={handleClick}
          >
            <Image
              src="/svg/trash.svg"
              alt="trash"
              width={34}
              height={24}
              className="transition-transform duration-200 ease-in-out transform hover:scale-125"
            />
          </div>
        </div>
        {shareOpen && (
          <div className="absolute top-10 left-20 p-2 bg-white shadow-md rounded-md z-50">
            <p className="text-sm">공유 링크: https://example.com</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="-mx-20 mr-30 relative border border-gray-200 bg-white h-[700px] w-[343px] shadow-md rounded-lg">
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
          className="p-4 overflow-hidden"
        >
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <CalendarNavItem key={item.id} id={item.id} label={item.label} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
