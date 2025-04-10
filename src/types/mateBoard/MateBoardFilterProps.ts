import { MateCardData } from "@/types/mateBoard/MateCardData";
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
  // 부모로부터 전달받은 초기 필터 값
  initialRegion: string;
  initialStatus: string;
  initialKeyword: string;
}
