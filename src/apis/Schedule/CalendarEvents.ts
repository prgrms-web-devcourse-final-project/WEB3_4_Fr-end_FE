import axios, {AxiosError} from "axios";
import type { FetchedEvent } from "@/types/Scheduleindex";

export interface CreateEventBody {
  scheduleTitle: string;
  startDate: string;
  endDate: string;
  note: string;
  alertTime: string;
  blockColor: string;
}

const getAuthHeader = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("refreshToken이 없습니다");
  return {
    Authorization: `Bearer ${refreshToken}`,
  };
};

// 일정 생성
export const createCalendarEvent = async (
  calendarId: string,
  body: CreateEventBody
) => {
  const response = await axios.post(
    `http://api.sete.kr:8080/api/v1/calendars/${calendarId}/schedules`,
    body,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

// 일정 목록 조회
export const fetchCalendarEvents = async (
  calendarId: string
): Promise<FetchedEvent[]> => {
  try {
    const response = await axios.get<FetchedEvent[]>(
      `http://api.sete.kr:8080/api/v1/calendars/${calendarId}/schedules`,
      {
        headers: getAuthHeader(),
      }
    );

    console.log("📦 일정 응답:", response.data);
    return response.data; // ✅ 그대로 사용하면 됨
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 404) {
      console.warn("📭 일정 없음 (404 응답) → 빈 배열 반환");
      return [];
    }

    throw err;
  }
};

// 일정 삭제
export const deleteCalendarEvent = async (
  calendarId: string,
  scheduleId: string
): Promise<void> => {
  await axios.delete(
    `http://api.sete.kr:8080/api/v1/calendars/${calendarId}/schedules/${scheduleId}`,
    {
      headers: getAuthHeader(),
    }
  );
};
