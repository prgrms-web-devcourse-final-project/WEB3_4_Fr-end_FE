"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchCalendars } from "@/apis/Schedule/CalendarNav";
import type { NavItem } from "@/types/Scheduleindex";
import { useAuthStore } from "@/store/useAuthStore";
import CalendarItem from "@/components/calendar/CalendarNavItem";
import {
  addNewCalendar,
  copyCalendarUrl,
  deleteCalendar,
  editCalendarTitle,
} from "@/utils/calendarHandlers";

export default function CalendarNav() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const userId = useAuthStore((state) => state.user?.id);
  const [items, setItems] = useState<NavItem[]>([]);
  const [editingCalendarId, setEditingCalendarId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);
  const [contentHeight, setContentHeight] = useState<string>("auto");

  useEffect(() => {
    const init = async () => {
      if (!userId) return;
      try {
        const calendarList = await fetchCalendars();
        const navItems = calendarList
          .filter((item) => item.userId.toString() === userId.toString())
          .map((item) => ({
            id: item.id.toString(),
            label: item.calendarTitle,
            shareOpen: false,
            userId: item.userId.toString(),
          }));
        setItems(navItems);
      } catch (err) {
        console.error(err);
      }
    };
    init();
  }, [userId]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen, items]);

  const handleAdd = () => {
    if (!userId) return;
    addNewCalendar(setItems);
  };

  const handleCopyUrl = (id: string) => {
    copyCalendarUrl(id);
  };

  const handleItemClick = (id: string) => {
    router.push(`/calendar/${id}`);
  };

  const handleDeleteCalendar = (id: string) => {
    if (!userId) return;
    deleteCalendar(id, setItems);
  };

  const handleEditComplete = (id: string) => {
    if (!userId) return;
    editCalendarTitle(id, editingLabel, setItems, () => {
      setEditingCalendarId(null);
      setEditingLabel("");
    });
  };

  return (
    <div className="p-4 select-none">
      <div className="relative border border-gray-200 bg-white h-[700px] w-[343px] shadow-md rounded-lg overflow-hidden">
        <p
          onClick={handleAdd}
          className="relative font-semibold text-xl pl-8 pt-8 text-gray-800 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
        >
          + New calendar
        </p>

        <div
          className="flex justify-between pt-8 px-6 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <p className="font-semibold text-base text-gray-800">내 일정</p>
          <Image
            src={isOpen ? "/svg/downArrow.svg" : "/svg/upArrow.svg"}
            alt="toggle"
            width={18}
            height={20}
          />
        </div>

        <div
          ref={contentRef}
          style={{
            height: contentHeight,
            minHeight: isOpen ? "auto" : "0",
            transition: "height 0.7s ease-in-out, opacity 1s ease-in-out",
            opacity: isOpen ? 1 : 0,
          }}
          className={`p-4 ${items.length > 10 ? "overflow-y-auto max-h-[600px]" : ""} scroll-smooth`}
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
