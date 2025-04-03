import Image from "next/image";
import { Button } from "../ui/button";

export default function SchedulerLinkBannerSection() {
  return (
    <>
      <section className="relative h-71 w-full overflow-hidden bg-amber-500 mt-20 rounded-2xl">
        <Image
          src={"/reservationImg/linkBanner.webp"}
          alt="스케쥴러링크배너"
          fill
          style={{ objectFit: "cover", filter: "brightness(70%)" }}
          quality={100}
        />
        <div className="absolute inset-y-15 inset-x-29 text-customGray-100 text-4xl font-paperlogy">
          <div className="mb-4">여행을 계획하고 계신가요?</div>
          <div className="mb-8">Planit이 도와드릴게요!</div>
          <Button size={"lg"}>스케쥴러 바로가기</Button>
        </div>
      </section>
    </>
  );
}
