import Image from "next/image";

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
  return (
    <div className="relative rounded-2xl overflow-hidden h-full">
      <Image
        src={imageSrc}
        alt={altText}
        layout="fill"
        style={{
          objectFit: "cover",
          filter: "brightness(50%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-customGray-100 text-3xl font-paperlogy">
        {label}
      </div>
    </div>
  );
}
