import { createCalendarEvent, CreateEventBody } from "@/apis/Schedule/CalendarEvents";
import type { CalendarEvent } from "@/types/Scheduleindex";

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

  const body: CreateEventBody = {
    scheduleTitle: eventTitle,
    startDate, 
    endDate,  
    note: "",
    alertTime: "00:00:00",
  };

  console.log("body:", body);

  try {
    const newEvent = await createCalendarEvent(calendarId, body);

    if (!newEvent || !newEvent.id) {
      console.error("❌ 서버에서 유효한 이벤트를 반환하지 않았습니다.", newEvent);
      return;
    }

    setEvents((prev) => [
      ...prev,
      {
        id: newEvent.id.toString(),
        title: newEvent.scheduleTitle,
        start: newEvent.startDate,
        end: newEvent.endDate,
        color: eventColor,
      },
    ]);
    closeModal();
  } catch (err) {
    console.error(err);
  }
};
