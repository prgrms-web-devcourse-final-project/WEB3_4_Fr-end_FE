export const travelRegions = [
  { value: "ALL", label: "전국" },
  { value: "SEOUL", label: "서울" },
  { value: "INCHEON", label: "인천" },
  { value: "DAEJEON", label: "대전" },
  { value: "DAEGU", label: "대구" },
  { value: "GWANGJU", label: "광주" },
  { value: "BUSAN", label: "부산" },
  { value: "ULSAN", label: "울산" },
  { value: "SEJONG", label: "세종특별자치시" },
  { value: "GYEONGGI", label: "경기도" },
  { value: "GANGWON", label: "강원특별자치도" },
  { value: "CHUNGBUK", label: "충청북도" },
  { value: "CHUNGNAM", label: "충청남도" },
  { value: "GYEONGBUK", label: "경상북도" },
  { value: "GYEONGNAM", label: "경상남도" },
  { value: "JEONBUK", label: "전북특별자치도" },
  { value: "JEONNAM", label: "전라남도" },
  { value: "JEJU", label: "제주도" },
] as const;

export type TravelRegion = (typeof travelRegions)[number]["value"];
export type TravelRegionLabel = (typeof travelRegions)[number]["label"];
