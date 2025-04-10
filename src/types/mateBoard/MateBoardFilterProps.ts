import type { MateCardData } from "./MateCardData";

export interface MateBoardFilterProps {
  cards: MateCardData[];
  totalPages: number;
  currentPage: number;
  onFilterChange: (newFilters: {
    keyword?: string;
    region?: string;
    status?: string;
    page?: number;
  }) => void;
  initialRegion: string;
  initialStatus: string;
  initialKeyword: string;
}
