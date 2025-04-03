'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import CalendarNavItem from '@/components/calendar/CalendarNavItem';
import { DragEndEvent } from '@dnd-kit/core';

interface NavItem {
  id: string;
  label: string;
  isEditing: boolean;
}

export default function CalendarNavTree() {
  const [items, setItems] = useState<NavItem[]>([
    { id: '1', label: '부산', isEditing: false },
    { id: '2', label: '제주도', isEditing: false },
    { id: '3', label: '인천', isEditing: false },
  ]);

  // 드래그 앤 드롭 핸들러
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const updatedItems = arrayMove(items, oldIndex, newIndex);
      setItems(updatedItems);
    }
  };

  return (
    <div className="p-4">
      <div className="relative border border-gray-200 bg-white h-[700px] w-[343px] shadow-md rounded-lg">
        <p
          className="relative font-semibold text-xl pl-10 pt-8 text-gray-800 select-none cursor-pointer"
        >
          + New calendar
        </p>

        <div className="p-4">
          {/* 클라이언트 전용 드래그 앤 드롭 컨텍스트 */}
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <CalendarNavItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  isEditing={item.isEditing}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
