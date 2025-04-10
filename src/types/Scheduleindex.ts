import type { DateClickArg, EventDragStopArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";

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
  onEventDragStop: (arg: EventDragStopArg) => void;
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
}

export interface SearchResult {
  place_name: string;
  category_name: string;
  address_name: string;
  x: number;
  y: number;
}

export interface PlanMapProps {
  searchResults: SearchResult[];
}

export interface CardData {
  id: number;
  placeName: string;
  searchResult: SearchResult | null;
}

export interface PlanCardContainerProps {
  onSearchResultsChange: (results: SearchResult[]) => void;
}

export interface PlanSearchBarProps {
  placeName: string;
  onPlaceNameChange: (placeName: string) => void;
  onSearchResult: (result: SearchResult | null) => void;
}

export interface SearchResult {
  place_name: string;
  category_name: string;
  address_name: string;
  x: number;
  y: number;
}

export interface KakaoPlace {
  place_name: string;
  category_group_name: string;
  address_name: string;
  x: string;
  y: string;
}

export interface PlanCardProps extends PlanSearchBarProps {
  searchResult: SearchResult | null;
  onDelete: () => void;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  color: string;
}

export interface CalendarPageProps {
  params: Promise<{
    id: string;
  }>;
}