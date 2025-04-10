"use client";

import { use } from "react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CalendarNav from "@/components/calendar/CalendarNav";
import CalendarMain from "@/components/calendar/CalendarMain";
import CalendarModal from "@/components/calendar/CalendarModal";
import type { DateClickArg, EventDragStopArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import type { CalendarEvent, CalendarPageProps } from "@/types/Scheduleindex";

export default function CalendarPage({ params }: CalendarPageProps) {
  const { id: calendarId } = use(params);
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventColor, setEventColor] = useState("#3b82f6");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dateClick = (arg: DateClickArg) => {
    setStartDate(arg.dateStr);
    setIsModalOpen(true);
  };

  const eventClick = (clickInfo: EventClickArg) => {
    router.push(`/calendar/${calendarId}/${clickInfo.event.id}`);
  };

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
      dragInfo.event.remove();
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const addNewEvent = () => {
    if (!eventTitle.trim() || !startDate) return;
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      start: startDate,
      end: endDate,
      color: eventColor,
    };
    const updated = [...events, newEvent];
    setEvents(updated);
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
