export interface CalendarMate {
  userNickname: string;
}

export interface CalendarData {
  id: number;
  name: string;
  description: string;
  mates: CalendarMate[];
}
