import axios from "axios";

export interface CreateEventBody {
  scheduleTitle: string;
  startDate: string; 
  endDate: string;   
  note: string;      
  alertTime: string;  
}

export const createCalendarEvent = async (
  calendarId: string,
  body: CreateEventBody
) => {
  const response = await axios.post(
    `http://api.sete.kr:8080/api/v1/calendars/${calendarId}/schedules`,
    body
  );
  console.log("📦 서버 응답:", response.data);
  return response.data;
};