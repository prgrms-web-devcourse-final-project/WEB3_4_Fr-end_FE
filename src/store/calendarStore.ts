import { create } from 'zustand';

interface Event {
  title: string;
  start: string;
  end?: string;
  color: string;
}

interface CalendarState {
  events: Record<string, Event[]>; // ID별로 이벤트를 관리
  addEvent: (id: string, event: Event) => void;
  getEvents: (id: string) => Event[];
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  events: {},

  addEvent: (id, event) =>
    set((state) => {
      const updatedEvents = state.events[id] ? [...state.events[id], event] : [event];
      return { events: { ...state.events, [id]: updatedEvents } };
    }),

  getEvents: (id) => {
    const events = get().events[id];
    return events ? events : [];
  },
}));
