import Image from "next/image";

const Footer: React.FC = () => {
  return (
    // <div className="w-full min-w-[1440px] h-full min-h-[290px] relative bg-neutral-600">
    //   <div className="w-[254px] h-[17px] ml-[101px] mt-[138px] absolute justify-start text-[#f2f2f2] text-[13px] font-normal font-['Pretendard']">
    //     Where Travelers Meet & Memories Begin.
    //   </div>
    //   <Image
    //     src="/logo/blue.png"
    //     alt="Logo"
    //     width={181}
    //     height={60}
    //     className="pt-[75px] ml-[100px]"
    //   />
    //   <div className="left-[409px] top-[36px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">
    //     MEMBER
    //   </div>
    //   <div className="w-[60px] left-[1046px] top-[92px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     TourAPI
    //   </div>
    //   <div className="w-[106px] left-[1046px] top-[131px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     KakaoMap API
    //   </div>
    //   <div className="w-[120px] left-[1046px] top-[170px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     FullCalender API
    //   </div>
    //   <div className="w-[106px] left-[1046px] top-[209px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     Kakao API
    //   </div>
    //   <div className="left-[1046px] top-[36px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">
    //     OPEN API
    //   </div>
    //   <div className="left-[728px] top-[36px] absolute justify-start text-white text-xl font-bold font-['Pretendard']">
    //     FEATURE
    //   </div>
    //   <div className="w-[41.78px] h-[18.75px] left-[411px] top-[92px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     배채연
    //   </div>
    //   <div className="w-[41.78px] h-[18.75px] left-[411px] top-[125.56px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     양윤호
    //   </div>
    //   <div className="w-[41.78px] h-[18.75px] left-[411px] top-[159.12px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     이석준
    //   </div>
    //   <div className="w-[41.78px] h-[18.75px] left-[411px] top-[192.68px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     이지환
    //   </div>
    //   <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[92px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     이재이
    //   </div>
    //   <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[125.56px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     박찬호
    //   </div>
    //   <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[159.12px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     이현준
    //   </div>
    //   <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[192.68px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     김나은
    //   </div>
    //   <div className="w-[41.78px] h-[18.75px] left-[472.67px] top-[226.25px] absolute justify-start text-white text-base font-normal font-['Pretendard']">
    //     유영주
    //   </div>
    //   <div className="w-[74px] left-[728px] top-[92px] absolute inline-flex flex-col justify-start items-start gap-[15px]">
    //     <div className="self-stretch justify-start text-white text-base font-normal font-['Pretendard']">
    //       숙소 예약
    //     </div>
    //     <div className="self-stretch justify-start text-white text-base font-normal font-['Pretendard']">
    //       Schedule
    //     </div>
    //     <div className="self-stretch justify-start text-white text-base font-normal font-['Pretendard']">
    //       메이트 찾기
    //     </div>
    //   </div>
    // </div>
    // <div className="w-full h-[290px] fixed bottom-0 bg-neutral-600 flex flex-col items-center">
    //   {/* 상단 로고 및 문구 */}
    //   <div className="w-full max-w-screen-xl flex justify-between items-center pt-8 px-8">
    //     <div className="flex flex-col items-start">
    //       <Image src="/logo/blue.png" alt="Logo" width={181} height={60} />
    //       <p className="text-[#f2f2f2] text-[13px] mt-4">
    //         Where Travelers Meet & Memories Begin.
    //       </p>
    //     </div>
    //     <div className="text-white text-xl font-bold">MEMBER</div>
    //     <div className="text-white text-xl font-bold">FEATURE</div>
    //     <div className="text-white text-xl font-bold">OPEN API</div>
    //   </div>

    //   {/* 세부 정보 */}
    //   <div className="w-full max-w-screen-xl flex justify-between items-start mt-6 px-8">
    //     {/* 팀원 정보 */}
    //     <div className="flex flex-wrap gap-x-4 w-1/3">
    //       {[
    //         "배채연",
    //         "양윤호",
    //         "이석준",
    //         "이지환",
    //         "이재이",
    //         "박찬호",
    //         "이현준",
    //         "김나은",
    //         "유영주",
    //       ].map((name, idx) => (
    //         <div key={idx} className="text-white text-base">
    //           {name}
    //         </div>
    //       ))}
    //     </div>

    //     {/* 기능 목록 */}
    //     <div className="flex flex-col gap-2 text-white w-1/3">
    //       <div>숙소 예약</div>
    //       <div>Schedule</div>
    //       <div>메이트 찾기</div>
    //     </div>

    //     {/* API 목록 */}
    //     <div className="flex flex-col gap-2 text-white w-1/3">
    //       <div>TourAPI</div>
    //       <div>KakaoMap API</div>
    //       <div>FullCalendar API</div>
    //       <div>Kakao API</div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full h-[290px] fixed bottom-0 bg-neutral-600 flex justify-center items-center">
      <div className="w-full max-w-screen-xl grid grid-cols-4 gap-8 px-8">
        {/* 로고 및 문구 */}
        <div className="flex flex-col items-start">
          <Image src="/logo/blue.png" alt="Logo" width={181} height={60} />
          <p className="text-[#f2f2f2] text-[13px] mt-4">
            Where Travelers Meet & Memories Begin.
          </p>
        </div>

        {/* MEMBER 섹션 */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">MEMBER</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white text-base">
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
              <div key={idx}>{name}</div>
            ))}
          </div>
        </div>

        {/* FEATURE 섹션 */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">FEATURE</h2>
          <div className="text-white text-base space-y-2">
            <div>숙소 예약</div>
            <div>Schedule</div>
            <div>메이트 찾기</div>
          </div>
        </div>

        {/* OPEN API 섹션 */}
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
  );
};

export default Footer;
