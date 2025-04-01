import Image from "next/image";

function MateHero() {
  return (
    <div className="w-screen h-[400px] relative left-1/2 right-1/2 -translate-x-1/2">
      <Image
        src="/mateHero.png"
        alt="hero image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-0" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-customGray-100 text-center z-10">
        <p className="text-[40px] md:text-2xl ">
          낯선 여행지도 함께 걸으면 더 편안해지는 법이죠.
          <br />
          당신과 꼭 맞는 <span className="font-paperlogy">여행 메이트</span>가
          여기 있어요!
        </p>
      </div>
    </div>
  );
}

export default MateHero;
