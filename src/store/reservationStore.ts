import { create } from "zustand";

interface ReservationState {
  checkIn: string;
  checkOut: string;
  setReservation: (checkIn: string, checkOut: string) => void;
}

const useReservationStore = create<ReservationState>((set) => ({
  checkIn: "",
  checkOut: "",
  setReservation: (checkIn, checkOut) => set({ checkIn, checkOut }),
}));

export default useReservationStore;
