import Image from "next/image";

const dummy = {
  id: 1,
  title: "겨울 감성 호텔 스테이",
  place: "부산광역시 해운대구 해운대해변로 1",
  startDate: "2025-12-20",
  endDate: "2025-12-22",
  img: "hotel-6862163_1280.jpg",
  city: "부산",
};

export default function Post() {
    const start = dayjs(dummy.startDate);
    const end = dayjs(dummy.endDate);
    const duration = end.diff(start, 'day') + 1;
    const formatted = `${start.format(`YY.MM.DD`)} - ${end.format(`YY.MM.DD`)} (${duration}일)`

  return (
    <div className="w-[210px] min-h-[260px] bg-white outline outline-customGray-400 rounded-[16px] flex-col">
      <Image
        src={`/myReservation/${dummy.img}`}
        alt={dummy.title}
        width={210}
        height={181}
        className="rounded-t-[16px] w-[210px] h-[181px] mb-[15px] object-cover"
      />
      <div className="p-[15px] flex-col justify-start items-start gap-[5px]">
        <div className="font-bold text-[13px] font-pretendard text-customGray-300">
          {dummy.city}
        </div>
        <div className="font-semibold text-black text-[16px]">
          {dummy.title}
        </div>
        <div className="flex">
          <Image
            src="/icons/Vector.png"
            alt="Calendar"
            width={15}
            height={13}
            className="w-[15px] h-[13px]"
          />
          <div>
            {dummy.startDate} - {dummy.endDate}
          </div>
        </div>
      </div>
    </div>
  );
}
