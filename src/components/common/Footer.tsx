import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <div className="w-full min-w-[1440px] h-full min-h-[290px] relative bg-neutral-600">
      <div className="w-[254px] h-[17px] left-[101px] top-[138px] absolute justify-start text-[#f2f2f2] text-[13px] font-normal font-['Pretendard']">
        Where Travelers Meet & Memories Begin.
      </div>
      <Image
        src="/logo/blue.png"
        alt="Logo"
        width={181}
        height={60}
        className="pt-[75px] ml-[100px]"
      />
      <div className="left-[409px] top-[36px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">
        MEMBER
      </div>
      <div className="w-[60px] left-[1046px] top-[92px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        TourAPI
      </div>
      <div className="w-[106px] left-[1046px] top-[131px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        KakaoMap API
      </div>
      <div className="w-[120px] left-[1046px] top-[170px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        FullCalender API
      </div>
      <div className="w-[106px] left-[1046px] top-[209px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        Kakao API
      </div>
      <div className="left-[1046px] top-[36px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">
        OPEN API
      </div>
      <div className="left-[728px] top-[36px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">
        FEATURE
      </div>
      <div className="w-[41.78px] h-[18.75px] left-[411px] top-[92px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        배채연
      </div>
      <div className="w-[41.78px] h-[18.75px] left-[411px] top-[125.56px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        양윤호
      </div>
      <div className="w-[41.78px] h-[18.75px] left-[411px] top-[159.12px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        이석준
      </div>
      <div className="w-[41.78px] h-[18.75px] left-[411px] top-[192.68px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        이지환
      </div>
      <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[92px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        이재이
      </div>
      <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[125.56px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        박찬호
      </div>
      <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[159.12px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        이현준
      </div>
      <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[192.68px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        김나은
      </div>
      <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[226.25px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
        유영주
      </div>
      <div className="w-[74px] left-[728px] top-[92px] absolute inline-flex flex-col justify-start items-start gap-[15px]">
        <div className="self-stretch justify-start text-white text-base font-normal font-['Pretendard']">
          숙소 예약
        </div>
        <div className="self-stretch justify-start text-white text-base font-normal font-['Pretendard']">
          Schedule
        </div>
        <div className="self-stretch justify-start text-white text-base font-normal font-['Pretendard']">
          메이트 찾기
        </div>
      </div>
    </div>
  );
};

export default Footer;
