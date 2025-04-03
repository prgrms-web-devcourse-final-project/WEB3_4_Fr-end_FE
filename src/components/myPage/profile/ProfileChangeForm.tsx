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
  const [isSubscribed, setIsSubscribed] = useState(false);
  const toggleSubscribed = () => {
    setIsSubscribed((prev) => !prev);
  };
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^01[016789]\d{7,8}$/.test(phone);

  const fields = [
    {
      label: "이메일",
      type: "email",
      placeholder: "새로운 이메일을 입력해 주세요.",
      e: "이메일 형식이 올바르지 않습니다!",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      isValid: email === "" || emailValid,
    },
    {
      label: "휴대폰 번호",
      type: "text",
      placeholder: "새로운 휴대폰 번호를 입력해 주세요. (-제외)",
      e: "휴대폰 번호 형식이 올바르지 않습니다!",
      value: phone,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPhone(e.target.value),
      isValid: phone === "" || phoneValid,
    },
  ];

  return (
    <div className="w-[726px] h-[698px] relative bg-white rounded-lg mb-[168px]">
      <div className="flex gap-8">
        <div className="flex flex-col items-center mt-[95px] ml-[95px]">
          <Image
            src=""
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
            className="mt-4 w-[120px] h-[25px] bg-customViloet-200 rounded-lg text-white text-[13px] hover:bg-customBlue-200 cursor-pointer"
          >
            이미지 업로드
          </button>
          <button className="mt-2  text-customViloet-200 text-[13px] hover:text-customBlue-200 cursor-pointer">
            이미지 제거
          </button>
        </div>
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
              className="text-customViloet-200 text-[13px] hover:text-customBlue-200 cursor-pointer"
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
            {fields.map((f, i) => (
              <div key={i} className="w-[408px] mb-4">
                <label className="text-base text-black font-[pretendard]">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={f.value}
                  onChange={f.onChange}
                  placeholder={f.placeholder}
                  className="w-full h-[50px] px-2.5 py-2 bg-white rounded outline outline-customGray-300 mt-1 focus:outline-customGray-600"
                />
                <p
                  className={`text-customPink-300 text-[13px] mt-1 ${
                    f.isValid ? "hidden" : ""
                  }`}
                >
                  {f.e}
                </p>
              </div>
            ))}
            <button className=" ml-[272px] mt-[18px] bg-black text-white w-[93px] h-[30px] rounded-[8px] text-[13px] font-bold font-pretendard hover:bg-customBlue-200 cursor-pointer">
              수정 완료
            </button>
            {isSubscribed === true ? (
              <div className="mt-8 w-[408px] h-[115px] border border-customGray-300 rounded">
                <div className="mt-[20px] ml-[20px] mb-[6px]">
                  <p className="text-[13px] font-semibold">
                    아쉽지만, 이제 작별할 시간인가요? 언제든 다시 돌아오실 수
                    있어요! 🥲
                  </p>
                  <p className="text-[13px] font-semibold">
                    구독 취소는 아래에서 가능합니다.
                  </p>
                </div>
                <button
                  onClick={toggleSubscribed}
                  className="bg-black text-white text-[13px] font-bold rounded-[8px] w-[93px] h-[30px] mt-[6px] ml-[272px] mb-[27px] hover:bg-customBlue-200 cursor-pointer"
                >
                  구독 취소
                </button>
              </div>
            ) : (
              <div className="mt-8 w-[408px] border border-customGray-300 rounded-[4px]">
                <div className="mt-[10px]">
                  <p className="text-[16px] font-semibold ml-[10px]">
                    🎉 이제부터 우리와 함께해요!
                  </p>
                  <p className="text-[13px] font-semibold mb-[7px] ml-[25px]">
                    앞으로 Planit의 유용한 정보와 소식을 메일로 받아보실 수
                    있어요.😎😎 좋은 인연이 되길 바라요! 😊
                  </p>
                </div>
                <button
                  onClick={toggleSubscribed}
                  className="bg-black text-white text-[13px] font-bold rounded-[8px] w-[93px] h-[30px] mt-[6px] ml-[272px] mb-[17px] hover:bg-customBlue-200"
                >
                  구독하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
