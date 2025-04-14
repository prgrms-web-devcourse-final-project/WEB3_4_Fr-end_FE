export const convertRegionToKorean = (region: string): string => {
  const regionMap: Record<string, string> = {
    ALL: "전국",
    SEOUL: "서울",
    INCHEON: "인천",
    DAEJEON: "대전",
    DAEGU: "대구",
    GWANGJU: "광주",
    BUSAN: "부산",
    ULSAN: "울산",
    SEJONG: "세종특별자치시",
    GYEONGGI: "경기도",
    GANGWON: "강원특별자치도",
    CHUNGBUK: "충청북도",
    CHUNGNAM: "충청남도",
    GYEONGBUK: "경상북도",
    GYEONGNAM: "경상남도",
    JEONBUK: "전북특별자치도",
    JEONNAM: "전라남도",
    JEJU: "제주도",
  };

  return regionMap[region.toUpperCase()] || region;
};
