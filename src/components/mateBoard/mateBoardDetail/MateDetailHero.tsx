import Image from "next/image";

export default function MateDetailHero() {
  return (
    <div className="w-screen h-[450px] relative left-1/2 right-1/2 -translate-x-1/2">
      <Image
        src="/mateDetail.png"
        alt="hero image"
        fill
        className="object-cover "
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0 " />

      <div className="absolute inset-0 flex flex-col items-center justify-center  text-center z-10">
        <p className="text-[40px] text-white">
          여기, 당신의 여행을 특별하게 만들어줄 <br />
          <span className="font-paperlogy">여행 메이트</span>가 기다리고 있어요.
        </p>
      </div>
    </div>
  );
}
