import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-customGray-600">
      <div className="container max-w-[1440px] mx-auto pt-12 pb-28 flex">
        <div className="w-full grid grid-cols-4 gap-8 px-2.5">
          <div className="flex flex-col items-start">
            <Image
              src="/logo/blue.png"
              alt="Logo"
              width={181}
              height={60}
              className="mt-[63px]"
            />
            <p className="text-[#f2f2f2] text-[13px] mt-[3px]">
              Where Travelers Meet & Memories Begin.
            </p>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold mb-4">MEMBER</h2>
            <div className="flex gap-x-10 text-white text-base">
              <div className="flex flex-col space-y-1">
                <div>배채연</div>
                <div>양윤호</div>
                <div>이석준</div>
                <div>이지환</div>
              </div>
              <div className="flex flex-col space-y-1">
                <div>이재이</div>
                <div>박찬호</div>
                <div>이현준</div>
                <div>김나은</div>
                <div>유영주</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold mb-4">FEATURE</h2>
            <div className="text-white text-base space-y-2">
              <div>숙소 예약</div>
              <div>Schedule</div>
              <div>메이트 찾기</div>
            </div>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold mb-4">OPEN API</h2>
            <div className="text-white text-base space-y-2">
              <div>TourAPI</div>
              <div>KakaoMap API</div>
              <div>FullCalendar API</div>
              <div>Kakao API</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
