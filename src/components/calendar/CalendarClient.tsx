"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CalendarNav from "@/components/calendar/CalendarNav";
import CalendarMain from "@/components/calendar/CalendarMain";
import CalendarModal from "@/components/calendar/CalendarModal";
import { handleAddNewEvent, handleDeleteEvent } from "@/utils/calendarEventHandlers";
import { fetchCalendarEvents } from "@/apis/Schedule/CalendarEvents";
import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import type { CalendarEvent, FetchedEvent } from "@/types/Scheduleindex";
import { adjustEndDate } from "@/utils/calendarDate";

interface CalendarClientProps {
  calendarId: string;
}

export default function CalendarClient({ calendarId }: CalendarClientProps) {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventColor, setEventColor] = useState("#3b82f6");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    eventId: string;
  }>({ visible: false, x: 0, y: 0, eventId: "" });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchCalendarEvents(calendarId);
        const parsed = data.map((event: FetchedEvent) => ({
          id: event.schedule_id.toString(),
          title: event.scheduleTitle,
          start: event.startDate,
          end: adjustEndDate(event.endDate),
          color: event.blockColor,
        }));
        setEvents(parsed);
      } catch (err) {
        console.error(err);
      }
    };
    loadEvents();
  }, [calendarId]);

  useEffect(() => {
    const handleClick = () => {
      setContextMenu((prev) => ({ ...prev, visible: false }));
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

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
    setEventColor("#3b82f6");
    setStartDate("");
    setEndDate("");
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
          eventDidMount={(info) => {
            info.el.addEventListener("contextmenu", (e) => {
              e.preventDefault();
              setContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                eventId: info.event.id,
              });
            });
          }}
        />

        {contextMenu.visible && (
          <div
            className="fixed z-50 bg-white text-sm font-semibold border-1 text-gray-800 cursor-pointer hover:bg-gray-100 rounded shadow px-3 py-2"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={async () => {
              await handleDeleteEvent(calendarId, contextMenu.eventId, setEvents);
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
          >
            🗑️ 일정 삭제
          </div>
        )}

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
