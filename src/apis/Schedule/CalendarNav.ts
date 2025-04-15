import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const api = axios.create({
  baseURL: 'http://api.sete.kr:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
  userId: number;
}

export interface UpdateCalendarBody {
  calendarTitle: string;
  startDate: string;
  endDate: string;
  alertTime: string;
  note: string;
}

// 캘린더 목록 조회
export const fetchCalendars = async (): Promise<CalendarResponse[]> => {
  const res = await api.get('/calendar');
  return res.data.data;
};

// 캘린더 생성
export const createCalendar = async (
  title: string
): Promise<CalendarResponse> => {
  const now = new Date().toISOString();
  const body = {
    calendarTitle: title,
    startDate: now,
    endDate: now,
    alertTime: now,
    labelColor: "#3b82f6",
    note: "",
  };
  const res = await api.post("/calendar", body);
  return res.data;
};

// 캘린더 삭제
export const deleteCalendarById = async (id: string) => {
  await api.delete(`/calendar/${id}`);
};

// 캘린더 수정
export const updateCalendar = async (
  calendarId: string,
  body: UpdateCalendarBody
) => {
  const res = await api.put(`/calendar/${calendarId}`, body);
  return res.data;
};
