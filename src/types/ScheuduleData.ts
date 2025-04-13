export interface CalendarMate {
  userNickname: string;
}

export interface CalendarData {
  id: number;
  name: string;
  description: string;
  mates: {
    userNickname: string;
  }[];
}

export interface CalendarApiResponse {
  calendarId: number;
  calendarTitle: string;
  note: string;
  startDate: string;
  endDate: string;
  sharedUserNicknames: string[];
}