export type Accommodation = {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  availableRooms: number;
  mainImage: string;
  amenities: string[];
  areaCode: number;
  cat3: string; // 카테고리 정보
  mapX: number;
  mapY: number;
  checkInTime: string;
  checkOutTime: string;
  createdAt: string;
  modifiedAt: string;
  area?: string;
  houseType?: string;
};

export type AccommodationResponse = {
  data: Accommodation[]; // 숙소 데이터 배열
  totalData: number; // 전체 데이터 개수
};
