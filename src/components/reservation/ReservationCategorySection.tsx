import ReservationCard from "./CategoryCard";

export default function ReservationCategorySection() {
  return (
    <section className="mt-20">
      <div className="font-paperlogy text-4xl">Planit으로 찾는 여행 숙소</div>
      <div className="text-lg font-medium">
        여행의 핵심! 숙소를 Planit과 함께 찾아봐요
      </div>
      <div className="relative grid grid-cols-4 gap-4 h-60 mt-4">
        <ReservationCard
          imageSrc="/reservationImg/hotel.webp"
          altText="여행 숙소 이미지"
          label="호텔"
        />
        <ReservationCard
          imageSrc="/reservationImg/pension.webp"
          altText="여행 숙소 이미지"
          label="펜션"
        />
        <ReservationCard
          imageSrc="/reservationImg/motel.webp"
          altText="여행 숙소 이미지"
          label="모텔"
        />
        <ReservationCard
          imageSrc="/reservationImg/koreanHouse.webp"
          altText="여행 숙소 이미지"
          label="한옥"
        />
      </div>
    </section>
  );
}
