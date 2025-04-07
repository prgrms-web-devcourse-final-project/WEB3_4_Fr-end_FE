export interface PlanSearchBarProps {
  placeName: string;
  onPlaceNameChange: (newPlaceName: string) => void;
  onSearchResult: (result: SearchResult | null) => void;
  onDelete?: () => void;
}

export interface SearchResult {
  place_name: string;
  category_name: string;
  address_name: string;
  x: number;
  y: number;
}
