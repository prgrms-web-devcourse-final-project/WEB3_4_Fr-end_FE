"use client";

import { useState } from "react";
import MyReservationPastCard from "./MyReservationPastCard";
import Link from "next/link";
import MyReservationCurrentCard from "./MyReservationCurrentCard";

const dummyPastContents = [
  {
    id: 1,
    img: "resort-7012893_1280 (1).jpg",
    state: true,
    name: "스톤우드 리조트",
    street: "강원도 평창군 봉평면 보래미길 123",
  },
  {
    id: 2,
    img: "huts-6837216_1280 (1).jpg",
    state: false,
    name: "에코 빌리지",
    street: "전라북도 남원시 지리산로 456",
  },
  {
    id: 3,
    img: "resort-7012893_1280.jpg",
    state: true,
    name: "선셋 라운지",
    street: "경기도 가평군 청평면 호반로 789",
  },
  {
    id: 4,
    img: "huts-6837216_1280.jpg",
    state: false,
    name: "초록민박",
    street: "경상남도 거창군 산청면 들꽃길 12",
  },
  {
    id: 5,
    img: "hotel-6862163_1280.jpg",
    state: true,
    name: "화이트힐 호텔",
    street: "부산광역시 해운대구 해운대해변로 1",
  },
  {
    id: 6,
    img: "hotelroom-7772422_1280.jpg",
    state: true,
    name: "소노룸",
    street: "서울특별시 종로구 사직로 88",
  },
  {
    id: 7,
    img: "apartment-406901_1280.jpg",
    state: false,
    name: "레트로 아파트먼트",
    street: "인천광역시 연수구 송도과학로 35",
  },
  {
    id: 8,
    img: "resort-846075_1280.jpg",
    state: true,
    name: "블루라군 리조트",
    street: "제주특별자치도 제주시 애월읍 일주서로 567",
  },
  {
    id: 9,
    img: "house-946986_1280.jpg",
    state: false,
    name: "화이트빌 펜션",
    street: "충청북도 제천시 금성면 수산리 21",
  },
  {
    id: 10,
    img: "testImg.webp",
    state: true,
    name: "강남스테이힐",
    street: "서울특별시 강남구 테헤란로13길 65",
  },
];

const dummyCurrentContents = [
  {
    id: 1,
    img: "resort-7012893_1280 (1).jpg",
    state: true,
    name: "스톤우드 리조트",
    street: "강원도 평창군 봉평면 보래미길 123",
    date: "2024-10-12",
    time: "14:00",
  },
  {
    id: 2,
    img: "huts-6837216_1280 (1).jpg",
    state: true,
    name: "에코 빌리지",
    street: "전라북도 남원시 지리산로 456",
    date: "2024-11-03",
    time: "16:00",
  },
  {
    id: 3,
    img: "resort-7012893_1280.jpg",
    state: true,
    name: "선셋 라운지",
    street: "경기도 가평군 청평면 호반로 789",
    date: "2024-11-26",
    time: "12:30",
  },
  {
    id: 4,
    img: "huts-6837216_1280.jpg",
    state: true,
    name: "초록민박",
    street: "경상남도 거창군 산청면 들꽃길 12",
    date: "2024-12-08",
    time: "15:00",
  },
  {
    id: 5,
    img: "hotel-6862163_1280.jpg",
    state: true,
    name: "화이트힐 호텔",
    street: "부산광역시 해운대구 해운대해변로 1",
    date: "2025-01-02",
    time: "13:00",
  },
  {
    id: 6,
    img: "hotelroom-7772422_1280.jpg",
    state: true,
    name: "소노룸",
    street: "서울특별시 종로구 사직로 88",
    date: "2025-01-15",
    time: "18:00",
  },
  {
    id: 7,
    img: "apartment-406901_1280.jpg",
    state: true,
    name: "레트로 아파트먼트",
    street: "인천광역시 연수구 송도과학로 35",
    date: "2025-02-01",
    time: "11:00",
  },
  {
    id: 8,
    img: "resort-846075_1280.jpg",
    state: true,
    name: "블루라군 리조트",
    street: "제주특별자치도 제주시 애월읍 일주서로 567",
    date: "2025-02-10",
    time: "10:00",
  },
  {
    id: 9,
    img: "house-946986_1280.jpg",
    state: true,
    name: "화이트빌 펜션",
    street: "충청북도 제천시 금성면 수산리 21",
    date: "2025-02-24",
    time: "17:30",
  },
  {
    id: 10,
    img: "testImg.webp",
    state: true,
    name: "강남스테이힐",
    street: "서울특별시 강남구 테헤란로13길 65",
    date: "2025-03-01",
    time: "14:00",
  },
];

export default function ReservationHistory() {
  const [visiblePastCount, setVisiblePastCount] = useState(3);
  const [visibleCurrentCount, setVisibleCurrentCount] = useState(3);

  const handlePastLoadMore = () => {
    setVisiblePastCount((prev) => prev + 3);
  };

  const handleCurrentLoadMore = () => {
    setVisibleCurrentCount((prev) => prev + 3);
  };

  const visibleCurrentItems = dummyCurrentContents.slice(
    0,
    visibleCurrentCount
  );
  const visiblePastItems = dummyPastContents.slice(0, visiblePastCount);
  const hasCurrentMore = visibleCurrentCount < dummyCurrentContents.length;
  const hasPastMore = visiblePastCount < dummyPastContents.length;

  return (
    <div className="w-[726px] min-h-[763px] flex-col">
      <div className="font-bold text-[28px] font-[pretendard] mb-[21px]">
        내 예약 내역
      </div>
      {!dummyCurrentContents || dummyCurrentContents.length === 0 ? (
        <div className="w-[726px] bg-customGray-100 px-[25px] py-[30px] rounded-[4px]">
          <p className="font-semibold text-[16px] font-[pretendard]">
            예정된 여행이 없습니다.
          </p>
          <p className="text-[13px]">지금 새로운 예약을 진행해보세요!</p>
          <Link
            href="/reservation"
            className="w-[112px] h-[30px] rounded-[8px] bg-customBlue-200 text-white font-semibold text-[13px] font-pretendard mt-[7px] px-[15px] py-[3px] hover:bg-customViloet-200"
          >
            여행지 찾아보기
          </Link>
        </div>
      ) : (
        <>
          {visibleCurrentItems.map((item) => (
            <MyReservationCurrentCard key={item.id} item={item} />
          ))}
          {hasCurrentMore && (
            <div
              onClick={handleCurrentLoadMore}
              className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mx-[285px] mb-[20px] hover:bg-customGray-600"
            >
              <div className="text-white text-[13px] font-semibold font-['Pretendard']">
                더보기
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex-col justify-center items-center mt-[20px]">
        <div className="font-bold text-[20px] font-pretendard mb-[17px]">
          이용완료 및 예약 취소
        </div>
        {visiblePastItems.map((item) => (
          <MyReservationPastCard key={item.id} item={item} />
        ))}
      </div>
      {hasPastMore && (
        <div
          onClick={handlePastLoadMore}
          className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mx-[285px] mb-[113px] hover:bg-customGray-600"
        >
          <div className="text-white text-[13px] font-semibold font-['Pretendard']">
            더보기
          </div>
        </div>
      )}
    </div>
  );
}
