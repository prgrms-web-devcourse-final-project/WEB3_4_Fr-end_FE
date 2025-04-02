import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";

type MateCardProps = {
  imageSrc: string;
  title: string;
  nickName: string;
  startDate: string;
  endDate: string;
  location: string;
};

export default function MateCard({
  imageSrc,
  title,
  nickName,
  startDate,
  endDate,
  location,
}: MateCardProps) {
  return (
    <>
      <div className="w-[302px] h-full border border-customGray-300 rounded-tr-2xl">
        <div className="w-full h-49 relative overflow-hidden rounded-tr-2xl">
          <Image src={imageSrc} alt="메이트카드 이미지" fill quality={100} />
        </div>
        <div className="my-3 mx-4">
          <div className="font-semibold text-xl whitespace-nowrap overflow-hidden overflow-ellipsis">
            {title}
          </div>
          <div className="text-sm mb-2">{nickName}</div>
          <div className="text-sm flex gap-1 items-center">
            <FaCalendarAlt />
            <div>
              {startDate} - {endDate}(1일)
            </div>
          </div>
          <div className="text-sm flex gap-1 items-center">
            <CiLocationOn />
            <div>{location}</div>
          </div>
          <button className="bg-customGray-100 w-full cursor-pointer text-center py-1 mt-2 rounded-xl">
            더 알아보기
          </button>
        </div>
      </div>
    </>
  );
}
