// /src/components/calendar/CalendarMain.tsx
"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  DateClickArg,
  EventDragStopArg,
} from "@fullcalendar/interaction";
import Image from "next/image";
import type { EventClickArg } from "@fullcalendar/core";

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  color: string;
}

interface CalendarMainProps {
  events: Event[];
  onDateClick: (arg: DateClickArg) => void;
  onEventClick: (arg: EventClickArg) => void;
  onEventDragStop: (arg: EventDragStopArg) => void;
}

export default function CalendarMain({
  events,
  onDateClick,
  onEventClick,
  onEventDragStop,
}: CalendarMainProps) {
  return (
    <div className="h-full w-full overflow-hidden relative">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        dateClick={onDateClick}
        eventClick={onEventClick}
        eventDragStop={onEventDragStop}
        events={events}
        height="100%"
        contentHeight="auto"
        headerToolbar={{
          start: "prev today next",
          center: "title",
          end: "dayGridMonth",
        }}
      />
      <div
        id="trash-drop-zone"
        className="fixed bottom-5 right-5 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <Image src="/svg/trash.svg" alt="trash" width={40} height={40} />
      </div>
    </div>
  );
}
