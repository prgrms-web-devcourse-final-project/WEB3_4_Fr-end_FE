"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarMainProps } from "@/types/Scheduleindex";

export default function CalendarMain({
  events,
  onDateClick,
  onEventClick,
  eventDidMount,
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
        events={events}
        height="100%"
        contentHeight="auto"
        eventDidMount={eventDidMount}
        headerToolbar={{
          start: "prev today next",
          center: "title",
          end: "dayGridMonth",
        }}
      />
    </div>
  );
}