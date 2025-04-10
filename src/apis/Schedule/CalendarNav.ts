import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.sete.kr:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


export interface CalendarResponse {
  id: number;
  calendarTitle: string;
  startDate: string;
  endDate: string;
  time: string;
  alertTime: string;
  note: string;
  createdAt: string;
  modifiedAt: string;
}

export interface UpdateCalendarBody {
  calendarTitle: string;
  startDate: string;
  endDate: string;
  alertTime: string;
  note: string;
}

// 캘린더 목록 가져오기
export const fetchCalendars = async (): Promise<CalendarResponse[]> => {
  const res = await api.get('/calendar');
  return res.data.data;
};

// 캘린더 생성
export const createCalendar = async (
  title: string,
  userId: string
): Promise<CalendarResponse> => {
  const now = new Date().toISOString();
  const body = {
    calendarTitle: title,
    startDate: now,
    endDate: now,
    alertTime: now,
    note: ''
  };
  const res = await api.post(`/calendar?userId=${userId}`, body);
  return res.data;
};


// 캘린더 삭제
export const deleteCalendarById = async (id: string, userId: string) => {
  await api.delete(`/calendar/${id}?userId=${userId}`);
};

// 캘린더 이름 변경
export const updateCalendar = async (
  calendarId: string,
  userId: string,
  body: UpdateCalendarBody
) => {
  const res = await api.put(`/calendar/${calendarId}?userId=${userId}`, body);
  return res.data;
};