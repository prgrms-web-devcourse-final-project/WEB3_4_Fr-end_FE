"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type ReservationCardProps = {
  imageSrc: string;
  altText: string;
  label: string;
};

export default function ReservationCard({
  imageSrc,
  altText,
  label,
}: ReservationCardProps) {
  const router = useRouter();

  return (
    <button
      className="relative rounded-2xl overflow-hidden h-full cursor-pointer"
      onClick={() => {
        router.push(`/reservation/search?categories=${label}`); // 카테고리를 쿼리 파라미터로 전달
      }}
    >
      <Image
        src={imageSrc}
        alt={altText}
        fill
        style={{
          objectFit: "cover",
          filter: "brightness(50%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-customGray-100 text-3xl font-paperlogy">
        {label}
      </div>
    </button>
  );
}
