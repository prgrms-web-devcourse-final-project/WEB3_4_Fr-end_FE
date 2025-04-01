import Image from "next/image";

export default function MateDetailPage() {
  return (
    <div className="px-4 py-12 max-w-5xl mx-auto space-y-12">
      {/* 제목 */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          6월 말 제주도 동행 구합니다.
        </h1>
      </div>

      {/* 여행 일정 */}
      <div className="bg-white shadow rounded-xl p-6 space-y-2 border border-gray-100">
        <div className="text-[20px] font-semibold text-customBlack-200 ">
          📅 여행 일정
        </div>
        <div className="text-[20px] font-medium text-customGray-600">
          2025-06-20 ~ 2025-06-30
        </div>
        <div className="text-[20px] font-semibold text-customBlack-200">
          📍 제주도
        </div>
      </div>

      {/* 모집 인원 */}
      <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
        <div className="text-[20px] text-customBlack-200 font-semibold mb-2">
          👥 모집 인원
        </div>
        <div className="text-[20px] text-customGray-600 ">3명</div>
      </div>

      {/* 여행 소개 + 이미지 */}
      <div className="w-full bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col md:flex-row items-start gap-6">
        {/* 왼쪽: 텍스트 소개 */}
        <div className="flex-1 space-y-3">
          <div className="text-[20px] text-customBlack-200 font-semibold">
            📝 여행 소개
          </div>
          <div className="whitespace-pre-line text-customGray-600 leading-relaxed text-[20px]">
            아직 정해지지는 않지만 동행을 구하고 같이 일정을 짜려고 합니다
            {"\n"}현 인원 : 20대 남1,여1
            {"\n"}예정은 6월 20~28일 이고 뒤로 하루씩 밀려도 상관 없습니다
            {"\n"}관심있으신분들 연락 부탁드립니다!!
          </div>
        </div>

        {/* 오른쪽: 이미지 */}
        <div className="w-full md:w-[250px] h-[250px] rounded-xl overflow-hidden border border-gray-200 shadow">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-semibold text-lg">
            IMG
          </div>
        </div>
      </div>

      {/* 여행장 */}
      <div className="bg-gray-50 rounded-xl p-6">
        {/* 상단: 프로필 영역 */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
            <Image
              src="/default-profile.png"
              alt="프로필"
              className="rounded-full"
              width={48}
              height={48}
            />
          </div>
          <div>
            <div className="text-[16px] font-semibold text-customBlack-200">
              닉네임
            </div>
            <div className="text-[16px] text-customGray-600">나이 · 성별</div>
          </div>
        </div>

        {/* 구분선 */}
        <hr className="my-4 border-customGray-300" />

        {/* 하단: 한줄 소개 */}
        <p className="text-[16px] text-customGray-600">
          서로를 존중하고 배려하는 여행을 하고 싶습니다.
        </p>
      </div>
    </div>
  );
}
