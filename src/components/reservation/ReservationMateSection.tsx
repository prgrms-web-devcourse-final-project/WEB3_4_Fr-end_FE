import Image from "next/image";
import MateCard from "./MateCard";

const mateCardsData = [
  {
    imageSrc: "/reservationImg/mateCardTest.webp",
    title: "5월에 같이 제주도 가실 분",
    nickName: "여행자1",
    startDate: "25.05.01",
    endDate: "25.05.02",
    location: "제주도",
  },
  {
    imageSrc: "/reservationImg/mateCardTest.webp",
    title: "4월에 같이 서울을 여행할 분",
    nickName: "여행자2",
    startDate: "25.04.10",
    endDate: "25.04.12",
    location: "서울",
  },
  {
    imageSrc: "/reservationImg/mateCardTest.webp",
    title: "6월에 부산 바다를 함께 갈 친구",
    nickName: "여행자3",
    startDate: "25.06.15",
    endDate: "25.06.16",
    location: "부산",
  },
  {
    imageSrc: "/reservationImg/mateCardTest.webp",
    title: "강원도에서 힐링할 동반자 구합니다",
    nickName: "여행자4",
    startDate: "25.07.01",
    endDate: "25.07.03",
    location: "강원도",
  },
];

export default function ReservationMateSection() {
  return (
    <>
      <section className="flex gap-10 w-full h-90 my-20">
        <div className="w-96">
          <div className="font-paperlogy text-6xl">#같이 가요</div>
          <div className="text-2xl font-semibold mt-4 mb-15">
            플래닛으로 구하는 여행메이트
          </div>
          <div className="ml-12 relative w-84 h-50">
            <Image
              src={"/svg/traveling.svg"}
              alt="여행svg"
              fill
              objectFit="cover"
            />
          </div>
        </div>
        <div className="w-full flex gap-4 bg-secondary">
          {/* {mateCardsData.map((mate, index) => (
            <MateCard
              key={index}
              imageSrc={mate.imageSrc}
              title={mate.title}
              nickName={mate.nickName}
              startDate={mate.startDate}
              endDate={mate.endDate}
              location={mate.location}
            />
          ))} */}
        </div>
      </section>
    </>
  );
}
