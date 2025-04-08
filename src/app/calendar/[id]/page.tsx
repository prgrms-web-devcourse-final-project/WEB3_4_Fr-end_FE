// src/app/calendar/[id]/[plan]/[chatid]/page.tsx
"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CalendarNav from "@/components/calendar/CalendarNav";
import CalendarMain from "@/components/calendar/CalendarMain";
import CalendarModal from "@/components/calendar/CalendarModal";
import type { DateClickArg, EventDragStopArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  color: string;
}

interface CalendarPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CalendarPage({ params }: CalendarPageProps) {
  const { id: calendarId } = use(params);  // Promise 언랩
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventColor, setEventColor] = useState("#3b82f6");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // localStorage에서 이벤트 불러오기
  useEffect(() => {
    if (calendarId) {
      const stored = localStorage.getItem(`calendarEvents-${calendarId}`);
      setEvents(stored ? JSON.parse(stored) : []);
    }
  }, [calendarId]);

  // 날짜 클릭 핸들러
  const dateClick = (arg: DateClickArg) => {
    setStartDate(arg.dateStr);
    setIsModalOpen(true);
  };

  // 이벤트 클릭 핸들러
  const eventClick = (clickInfo: EventClickArg) => {
    router.push(`/calendar/${calendarId}/${clickInfo.event.id}`);
  };

  // 이벤트 드래그 후 드롭 핸들러
  const handleEventDragStop = (dragInfo: EventDragStopArg) => {
    const trash = document.getElementById("trash-drop-zone");
    if (!trash) return;
    const rect = trash.getBoundingClientRect();
    const { clientX, clientY } = dragInfo.jsEvent;
    if (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    ) {
      const filtered = events.filter((e) => e.id !== dragInfo.event.id);
      setEvents(filtered);
      localStorage.setItem(
        `calendarEvents-${calendarId}`,
        JSON.stringify(filtered)
      );
      dragInfo.event.remove();
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const addNewEvent = () => {
    if (!eventTitle.trim() || !startDate) return;
    const newEvent: Event = {
      id: Date.now().toString(),
      title: eventTitle,
      start: startDate,
      end: endDate,
      color: eventColor,
    };
    const updated = [...events, newEvent];
    setEvents(updated);
    localStorage.setItem(
      `calendarEvents-${calendarId}`,
      JSON.stringify(updated)
    );
    closeModal();
  };

  return (
    <div className="flex h-screen">
      <CalendarNav />
      <div className="flex-1 relative">
        <CalendarMain
          events={events}
          onDateClick={dateClick}
          onEventClick={eventClick}
          onEventDragStop={handleEventDragStop}
        />
        <CalendarModal
          isOpen={isModalOpen}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          eventColor={eventColor}
          setEventColor={setEventColor}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          addNewEvent={addNewEvent}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
}
