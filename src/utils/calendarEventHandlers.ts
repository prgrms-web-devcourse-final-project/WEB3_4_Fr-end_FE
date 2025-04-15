import { createCalendarEvent, CreateEventBody, deleteCalendarEvent } from "@/apis/Schedule/CalendarEvents";
import type { CalendarEvent } from "@/types/Scheduleindex";
import { adjustEndDate } from "./calendarDate";

export const handleAddNewEvent = async (
  calendarId: string,
  eventTitle: string,
  eventColor: string,
  startDate: string,
  endDate: string,
  closeModal: () => void,
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
) => {
  if (!eventTitle.trim() || !startDate) return;

  const adjustedEnd = adjustEndDate(endDate);

  const body: CreateEventBody = {
    scheduleTitle: eventTitle,
    startDate,
    endDate,
    note: "",
    blockColor: eventColor,
    alertTime: "00:00:00",
  };

  try {
    const newEvent = await createCalendarEvent(calendarId, body);

    if (!newEvent || !newEvent.schedule_id) return;

    setEvents((prev) => [
      ...prev,
      {
        id: newEvent.schedule_id.toString(),
        title: newEvent.scheduleTitle,
        start: newEvent.startDate,
        end: adjustedEnd,
        color: newEvent.blockColor,
      },
    ]);

    closeModal();
  } catch (err) {
    console.error(err);
  }
};

export const handleDeleteEvent = async (
  calendarId: string,
  scheduleId: string,
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
) => {
  try {
    await deleteCalendarEvent(calendarId, scheduleId);
    setEvents((prev) => prev.filter((event) => event.id !== scheduleId));
  } catch (err) {
    console.error(err);
  }
};
