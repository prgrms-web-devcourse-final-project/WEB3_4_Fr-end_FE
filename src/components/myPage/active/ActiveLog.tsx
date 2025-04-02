import { useState } from "react";
import Accompany from "./accompany";
import Comment from "./comment";
import Post from "./post";

const dummyTravelPosts = [
  {
    id: 1,
    title: "겨울 감성 호텔 스테이",
    place: "부산광역시 해운대구 해운대해변로 1",
    startDate: "2025-12-20",
    endDate: "2025-12-22",
    img: "hotel-6862163_1280.jpg",
    city: "부산",
  },
  {
    id: 2,
    title: "모던한 호텔룸에서의 하루",
    place: "서울특별시 종로구 사직로 88",
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    img: "hotelroom-7772422_1280.jpg",
    city: "서울",
  },
  {
    id: 3,
    title: "도심 속 레트로 아파트",
    place: "인천광역시 연수구 송도과학로 35",
    startDate: "2025-10-01",
    endDate: "2025-10-03",
    img: "apartment-406901_1280.jpg",
    city: "인천",
  },
  {
    id: 4,
    title: "제주의 블루라군 리조트",
    place: "제주특별자치도 제주시 애월읍 일주서로 567",
    startDate: "2025-09-05",
    endDate: "2025-09-07",
    img: "resort-846075_1280.jpg",
    city: "제주도",
  },
  {
    id: 5,
    title: "자연 속 화이트빌 펜션",
    place: "충청북도 제천시 금성면 수산리 21",
    startDate: "2025-08-10",
    endDate: "2025-08-12",
    img: "house-946986_1280.jpg",
    city: "제천",
  },
  {
    id: 6,
    title: "스톤우드 리조트의 눈 덮인 풍경",
    place: "강원도 평창군 봉평면 보래미길 123",
    startDate: "2025-01-05",
    endDate: "2025-01-07",
    img: "resort-7012893_1280 (1).jpg",
    city: "평창",
  },
  {
    id: 7,
    title: "자연과 함께하는 에코 빌리지",
    place: "전라북도 남원시 지리산로 456",
    startDate: "2025-03-10",
    endDate: "2025-03-12",
    img: "huts-6837216_1280 (1).jpg",
    city: "남원",
  },
  {
    id: 8,
    title: "호수 옆 선셋 라운지",
    place: "경기도 가평군 청평면 호반로 789",
    startDate: "2025-04-15",
    endDate: "2025-04-17",
    img: "resort-7012893_1280.jpg",
    city: "가평",
  },
  {
    id: 9,
    title: "감성 민박 초록민박",
    place: "경상남도 거창군 산청면 들꽃길 12",
    startDate: "2025-06-01",
    endDate: "2025-06-03",
    img: "huts-6837216_1280.jpg",
    city: "거창",
  },
];

export default function ActiveLog() {
  const [selectedMenu, setSelectedMenu] = useState<string>("작성한 게시물");
  const renderContent = () => {
    switch (selectedMenu) {
      case "작성한 게시물":
        return <Post />;
      case "작성한 댓글":
        return <Comment />;
      case "동행 목록":
        return <Accompany />;
      default:
        return null;
    }
  };
  const list = ["작성한 게시물", "작성한 댓글", "동행 목록"];

  return (
    <div className="w-[726px] min-h-[986px] flex-col">
      <div className="font-bold text-[28px] font-[pretendard] mb-[21px]">
        내 활동 내역
      </div>
      <div className="flex gap-[10px]">
        {list.map((menu) => (
          <div
            key={menu}
            onClick={() => setSelectedMenu(menu)}
            className={`cursor-pointer font-normal text-[13px] font-pretendard hover:text-customBlack-400 ${
              selectedMenu === menu
                ? "text-black font-semibold"
                : "text-customGray-500"
            }`}
          >
            {menu}
          </div>
        ))}
      </div>
      <div className="w-[726px] h-[1px] bg-customGray-400 mt-[10px] mb-[20px]" />
      <div className="w-[726px]">{renderContent()}</div>
    </div>
  );
}
