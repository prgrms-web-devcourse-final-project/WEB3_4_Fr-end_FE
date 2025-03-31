import Image from "next/image";

function myPage() {
  return (
    <div className="w-[1044px] h-[699px] relative">
      <div className="w-[196px] h-px left-0 top-[275px] absolute bg-[#d9d9d9]" />
      <Image
        src="/defaultAvatar/31.png"
        alt="user"
        width={196}
        height={196}
        className="w-[196px] h-[196px] left-0 top-0 absolute"
      />
      <div className="left-[52px] top-[223px] absolute justify-start text-black text-xl font-normal font-['Pretendard']">
        반갑습니다!
      </div>
      <div className="left-[40px] top-[247px] absolute justify-start text-customViloet-200 text-xl font-normal font-['Pretendard']">
        PlanitTest1
      </div>
      <div className="left-[138px] top-[247px] absolute justify-start text-black text-xl font-normal font-['Pretendard']">
        님!
      </div>
      <div className="left-[50px] top-[303px] absolute text-center justify-start text-black text-xl font-semibold font-['Pretendard']">
        개인 정보
      </div>
      <div className="left-[50px] top-[389px] absolute justify-start text-[#707070] text-xl font-normal font-['Pretendard']">
        내 활동 내역
      </div>
      <div className="left-[50px] top-[423px] absolute justify-start text-sub-200 text-xl font-normal font-['Pretendard']">
        로그 아웃
      </div>
      <div className="w-[30px] h-[30px] left-[166px] top-[166px] absolute" />
      <div className="left-[70px] top-[337px] absolute justify-start text-[#1a1a1a] text-[13px] font-semibold font-['Pretendard']">
        비밀번호 변경
      </div>
      <div className="left-[70px] top-[363px] absolute justify-start text-[#707070] text-[13px] font-normal font-['Pretendard']">
        내 프로필 변경
      </div>
      <div className="w-[726px] h-[698px] left-[318px] top-[1px] absolute opacity-25 bg-white rounded-lg outline outline-[#979797]" />
      <div className="w-[547px] left-[424px] top-[51px] absolute inline-flex justify-start items-start flex-wrap content-start">
        <div className="w-10 h-10 relative overflow-hidden">
          <div className="w-[16.67px] h-[11.67px] left-[11.67px] top-[3.33px] absolute bg-[#424242]" />
          <div className="w-[26.67px] h-[21.67px] left-[6.67px] top-[15px] absolute bg-[#fb8c00]" />
          <div className="w-[5px] h-[5px] left-[17.50px] top-[23.33px] absolute bg-[#c76e00]" />
        </div>
        <div className="justify-start text-black text-[28px] font-bold font-['Pretendard']">
          비밀번호 변경
        </div>
        <div className="justify-start text-black text-[13px] font-normal font-['Pretendard']">
          회원님의 계정을 안전하게 보호하기 위해 정기적인 비밀번호 변경을
          권장합니다.{" "}
        </div>
        <div className="justify-start text-black text-[13px] font-normal font-['Pretendard']">
          안전한 비밀번호 설정은 계정 보안을 강화하고, 해킹 및 부정 접속으로부터
          보호하는 데 중요한 역할을 합니다.
        </div>
      </div>
    </div>
  );
}

export default myPage;
