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
}

export default function CalendarNavTree() {
  const [items, setItems] = useState<NavItem[]>([
    { id: '1', label: '부산' },
    { id: '2', label: '제주도' },
    { id: '3', label: '인천' },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const updatedItems = arrayMove(items, oldIndex, newIndex);
      setItems(updatedItems);
    }
  };

  // 자식 노드 추가
  const addItem = () => {
    const newItem = {
      id: (items.length + 1).toString(),
      label: `Item ${items.length + 1}`,
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="p-4">
      {/* 캘린더 내비바 */}
      <div
        className="relative border border-gray-200 bg-white h-[700px] w-[343px] shadow-md rounded-lg"
      >
        <p onClick={addItem} 
        className="relative font-semibold text-xl pl-10 pt-8 text-gray-800 
        select-none cursor-pointer">+ New calendar</p>

        <div className="p-4">
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
