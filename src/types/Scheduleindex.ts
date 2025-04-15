import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg, EventMountArg } from "@fullcalendar/core";

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  color: string;
}

export interface CalendarMainProps {
  events: CalendarEvent[];
  onDateClick: (arg: DateClickArg) => void;
  onEventClick: (arg: EventClickArg) => void;
  eventDidMount?: (info: EventMountArg) => void;
}

export interface CalendarModalProps {
  isOpen: boolean;
  eventTitle: string;
  setEventTitle: (title: string) => void;
  eventColor: string;
  setEventColor: (color: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  addNewEvent: () => void;
  closeModal: () => void;
}

export interface NavItem {
  id: string;
  label: string;
  shareOpen: boolean;
  userId: string;
}

export interface SearchResult {
  place_name: string;
  category_name: string;
  address_name: string;
  x: number;
  y: number;
  id?: string;
}

export interface PlanMapProps {
  searchResults: SearchResult[];
}

export interface CardData {
  id: number;
  placeName: string;
  searchResult: SearchResult | null;
  time?: string;
  travelId?: number;
}

export interface PlanCardContainerProps {
  onSearchResultsChange: (results: SearchResult[]) => void;
  calendarId: string;
  scheduleId: string;
  startDate: string;
  endDate: string;
  dailyTravels: DailyTravelResponse[];
  scheduleDayIds: number[];
  activeDayIndex: number;
  onDayClick: (index: number) => void;
}

export interface PlanSearchBarProps {
  placeName: string;
  onPlaceNameChange: (placeName: string) => void;
  onSearchResult: (result: SearchResult | null) => void;
}

export interface PlanCardProps extends PlanSearchBarProps {
  searchResult: SearchResult | null;
  onDelete: () => void;
  onBookmarkClick?: (result: SearchResult, time: string) => void;
  time?: string;
  scheduleId: string;
  travelId?: number;
  scheduleDayId: number;
}

export interface KakaoPlace {
  place_name: string;
  category_group_name: string;
  address_name: string;
  x: string;
  y: string;
  id?: string;
}

export interface CalendarPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface FetchedEvent {
  schedule_id: number;
  scheduleTitle: string;
  startDate: string;
  endDate: string;
  note: string;
  alertTime: string;
  blockColor: string;
}

export interface ScheduleDetailResponse {
  schedule_id: number;
  scheduleTitle: string;
  startDate: string;
  endDate: string;
  alertTime: string;
  note: string;
  labelColor?: string;
}

export interface PlanHeaderProps {
  title: string;
  startDate: string;
  endDate: string;
  calendarId: string;
}

export interface TravelPlaceRequest {
  scheduleDayId: number;
  hour: string;
  minute: string;
  id: string;
  place_name: string;
  category_group_name: string;
  x: number;
  y: number;
}

export interface TravelResponse {
  travel_id: number;
  schedule_day_id: number;
  hour: number;
  minute: number;
  id: string;
  place_name: string;
  category_group_name: string;
  x: number;
  y: number;
}

export interface DailyTravelResponse {
  scheduleDayId: number;
  date: string;
  travelCount: number;
  travels: TravelResponse[];
}

export interface ScheduleTravelsResponse {
  scheduleTitle: string;
  startDate: string;
  endDate: string;
  scheduleDayIds: number[];
  dailyTravels: DailyTravelResponse[];
}
