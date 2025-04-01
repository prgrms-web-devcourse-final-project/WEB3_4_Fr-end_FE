import { create } from "zustand";
import { MateCardData } from "./../../../types/MateCardData";

type MateDetailStore = {
  currentDetail: MateCardData | null;
  setDetail: (data: MateCardData) => void;
  clearDetail: () => void;
};

export const useMateDetailStore = create<MateDetailStore>((set) => ({
  currentDetail: null,
  setDetail: (data) => set({ currentDetail: data }),
  clearDetail: () => set({ currentDetail: null }),
}));
