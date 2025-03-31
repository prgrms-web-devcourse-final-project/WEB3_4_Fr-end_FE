import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-customGray-600">
      <div className="container max-w-[1440px] mx-auto pt-12 pb-28 flex">
        <div className="w-full grid grid-cols-4 gap-8 px-[0px] mx-[100px]">
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
            <div className="grid grid-cols-2 gap-x-[10px] gap-y-[5px] text-white text-base">
              {[
                "배채연",
                "이재이",
                "양윤호",
                "박찬호",
                "이석준",
                "이현준",
                "이지환",
                "김나은",
                "",
                "유영주",
              ].map((name, idx) => (
                <div key={idx} className="w-auto h-auto">
                  {name}
                </div>
              ))}
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
