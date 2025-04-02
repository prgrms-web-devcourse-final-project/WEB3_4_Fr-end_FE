import Image from "next/image";

type ReservationSearchCardProps = {
  imageSrc: string;
  area: string;
  houseType: string;
  houseName: string;
  location: string;
};

export default function ReservationSearchCard({
  imageSrc,
  area,
  houseType,
  houseName,
  location,
}: ReservationSearchCardProps) {
  return (
    <>
      <div className="w-full h-80 border border-customGray-300 rounded-2xl overflow-hidden">
        <div className="w-full h-50 relative">
          <Image src={imageSrc} alt="검색 이미지" fill objectFit="cover" />
        </div>
        <div className="m-3">
          <div className="flex gap-2">
            <div className="px-2 py-1 rounded-lg bg-customGray-400">{area}</div>
            <div className="px-2 py-1 rounded-lg bg-customGray-400">
              {houseType}
            </div>
          </div>
          <div className="font-bold text-xl mt-2">{houseName}</div>
          <div className="mt-1">{location}</div>
        </div>
      </div>
    </>
  );
}
