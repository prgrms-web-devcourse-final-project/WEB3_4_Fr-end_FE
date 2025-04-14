"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import CalendarNav from "@/components/calendar/CalendarNav";
import CalendarMain from "@/components/calendar/CalendarMain";
import CalendarModal from "@/components/calendar/CalendarModal";
import { handleAddNewEvent } from "@/utils/calendarEventHandlers";
import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import type { CalendarEvent } from "@/types/Scheduleindex";

export default function CalendarPage() {
  const { id } = useParams();
  const calendarId = id as string;
  const router = useRouter();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventColor, setEventColor] = useState("#3b82f6");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dateClick = (arg: DateClickArg) => {
    setStartDate(arg.dateStr);
    setEndDate(arg.dateStr);
    setIsModalOpen(true);
  };

  const eventClick = (clickInfo: EventClickArg) => {
    router.push(`/calendar/${calendarId}/${clickInfo.event.id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventTitle("");
    setStartDate("");
    setEndDate("");
    setEventColor("#3b82f6");
  };

  const addNewEvent = () => {
    handleAddNewEvent(
      calendarId,
      eventTitle,
      eventColor,
      startDate,
      endDate,
      closeModal,
      setEvents
    );
  };

  return (
    <div className="flex h-screen">
      <CalendarNav />
      <div className="flex-1 relative">
        <CalendarMain
          events={events}
          onDateClick={dateClick}
          onEventClick={eventClick}
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
