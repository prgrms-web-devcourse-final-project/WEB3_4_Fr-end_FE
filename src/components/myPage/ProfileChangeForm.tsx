"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function ProfileChangeForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("PlanitTest1");
  const [intro, setIntro] = useState(
    "자연을 사랑하는 여행자와 함께할 메이트를 찾습니다! 🌿✈️"
  );
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const fields = [
    {
      label: "이메일",
      placeholder: "새로운 이메일을 입력해 주세요.",
      e: "비밀번호가 다릅니다.",
    },
    {
      label: "휴대폰 번호",
      placeholder: "새로운 휴대폰 번호를 입력해 주세요.",
      e: "비밀번호 형식이 올바르지 않습니다!",
    },
  ];

  return (
    <div className="w-[726px] h-[698px] relative bg-white rounded-lg ">
      <div className="flex gap-8">
        {/* 아바타 + 버튼 */}
        <div className="flex flex-col items-center mt-[95px] ml-[95px]">
          <Image
            src="/defaultAvatar/31.png"
            alt="프로필 이미지"
            width={150}
            height={150}
            className="rounded-full"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={handleUploadClick}
            className="mt-4 w-[120px] h-[25px] bg-customViloet-200 rounded-lg text-white text-[13px] hover:bg-customBlue-200"
          >
            이미지 업로드
          </button>
          <button className="mt-2  text-customViloet-200 text-[13px] hover:text-customBlue-200">
            이미지 제거
          </button>
        </div>

        {/* 구분선 + 정보 */}
        <div className="flex flex-col w-full relative">
          <div className="absolute left-[0] top-[75px] w-[1px] h-[219px] bg-customGray-400" />

          <div className="ml-8 mt-[101px]">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="text-[40px] font-bold rounded w-full max-w-[447px] h-[60px]"
                />
                <br />
              </div>
            ) : (
              <p className="text-[40px] font-bold max-w-[447px] h-[60px]">
                {nickname}
              </p>
            )}
            <button
              className="text-[#9f99eb] text-[13px] hover:text-customBlue-200"
              onClick={toggleEdit}
            >
              {isEditing ? "확인" : "수정"}
            </button>
            <br />

            {isEditing ? (
              <textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="mt-2 text-[13px] font-semibold  w-[326px] h-[60px]"
              />
            ) : (
              <p className="mt-2 text-[13px] font-semibold w-[326px] h-[60px] mb-[6.5px]">
                {intro}
              </p>
            )}

            <div className="w-[408px]">
              <label className="text-base text-black font-[pretendard]">
                이메일
              </label>
              <input
                type="email"
                placeholder="새로운 이메일을 입력해 주세요."
                className="w-full h-[50px] px-2.5 py-2 bg-white rounded outline outline-[#bfbfbf] mt-1 focus:outline-customGray-600"
              />
              <p className="text-customPink-300 text-[13px] mt-1 hidden">
                이메일 형식이 올바르지 않습니다!
              </p>
            </div>
            <div className="mt-4 w-[408px]">
              <label className="text-base text-black font-[pretendard]">
                휴대폰 번호
              </label>
              <input
                type="text"
                placeholder="새로운 휴대폰 번호를 입력해 주세요"
                className="w-full h-[50px] px-2.5 py-2 bg-white rounded outline outline-customGray-300 mt-1 focus:outline-customGray-600"
              />
            </div>

            {/* 수정 완료 버튼 */}
            <button className=" ml-[272px] mt-[18px] bg-black text-white w-[93px] h-[30px] rounded-lg text-[13px] font-bold font-pretendard">
              수정 완료
            </button>

            {/* 구독 취소 안내 */}
            <div className="mt-8 w-[408px] p-4 border border-[#bfbfbf] rounded">
              <p className="text-[13px] font-semibold">
                아쉽지만, 이제 작별할 시간인가요? 언제든 다시 돌아오실 수
                있어요! 🥲
              </p>
              <p className="text-[13px] font-semibold mb-2">
                구독 취소는 아래에서 가능합니다.
              </p>
              <button className="bg-black text-white text-[13px] font-bold px-4 py-1 rounded">
                구독 취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
