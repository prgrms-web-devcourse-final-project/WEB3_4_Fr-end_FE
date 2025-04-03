import { TravelPost } from "../types/TravelPost";

const cities = [
  { city: "서울", place: "서울특별시 종로구 사직로 88" },
  { city: "부산", place: "부산광역시 해운대구 해운대해변로 1" },
  { city: "제주", place: "제주특별자치도 제주시 애월읍 일주서로 567" },
  { city: "강릉", place: "강원도 강릉시 경포로 365" },
  { city: "가평", place: "경기도 가평군 청평면 호반로 789" },
  { city: "남원", place: "전라북도 남원시 지리산로 456" },
  { city: "거창", place: "경상남도 거창군 산청면 들꽃길 12" },
  { city: "인천", place: "인천광역시 연수구 송도과학로 35" },
  { city: "제천", place: "충청북도 제천시 금성면 수산리 21" },
  { city: "평창", place: "강원도 평창군 봉평면 보래미길 123" },
];

const titles = [
  "감성 숙소 스테이",
  "자연 속 여행",
  "레트로 스타일의 하루",
  "호캉스 최고의 선택",
  "블루라군 리조트 체험",
  "산속 힐링 타임",
  "감성 민박에서 쉬다",
  "도심 속의 여유",
  "럭셔리 리조트 나들이",
  "하늘과 가까운 펜션",
];

const images = [
  "hotel-6862163_1280.jpg",
  "hotelroom-7772422_1280.jpg",
  "apartment-406901_1280.jpg",
  "resort-846075_1280.jpg",
  "house-946986_1280.jpg",
  "resort-7012893_1280 (1).jpg",
  "huts-6837216_1280 (1).jpg",
  "resort-7012893_1280.jpg",
  "huts-6837216_1280.jpg",
];

function getRandomDate(): { startDate: string; endDate: string } {
  const start = new Date(2025, 0, 1);
  const end = new Date(2025, 11, 29); // 12월 말까지

  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const startDate = new Date(randomTime);
  const endDate = new Date(randomTime + 2 * 24 * 60 * 60 * 1000); // +2일

  const format = (date: Date) => date.toISOString().split("T")[0];

  return {
    startDate: format(startDate),
    endDate: format(endDate),
  };
}

export const dummyTravelPosts: TravelPost[] = Array.from(
  { length: 27 },
  (_, i) => {
    const id = i + 1;
    const title =
      titles[Math.floor(Math.random() * titles.length)] + ` (${id})`;
    const img = images[i % images.length];
    const { city, place } = cities[Math.floor(Math.random() * cities.length)];
    const { startDate, endDate } = getRandomDate();

    return {
      id,
      title,
      place,
      startDate,
      endDate,
      img,
      city,
    };
  }
);
