"use client";

import Image from "next/image";
import { useState } from "react";

export default function MyPage(): JSX.Element {
  const [isPersonalOpen, setIsPersonalOpen] = useState<boolean>(true);
  const [isPasswordOpen, setPasswordOpen] = useState<boolean>(true);
  const [isActiveOpen, setIsActiveOpen] = useState<boolean>(true);

  return (
    <div className="max-w-[1044px] mx-auto flex gap-[122px] py-8 mb-[166px] mt-[89px]">
      <div className="w-[197px] h-[447px] flex flex-col items-center">
        <Image
          src="/defaultAvatar/31.png"
          alt="user"
          width={196}
          height={196}
          className="rounded-full"
        />
        <p className="mt-4 text-black text-xl">반갑습니다!</p>
        <span className="text-customViloet-200 text-xl">PlanitTest1</span>
        <p className="text-black text-xl">님!</p>

        <div className="mt-6 w-full border-t border-gray-300 pt-4 flex flex-col items-start gap-[10px]">
          <button
            type="button"
            onClick={() => setIsPersonalOpen((prev) => !prev)}
            className={
              !isPersonalOpen
                ? "text-[20px] font-pretendard focus:outline-none text-customGray-500"
                : "text-[20px] font-pretendard font-semibold text-customBlack-400"
            }
          >
            개인 정보
          </button>

          {isPersonalOpen && (
            <ul className="pl-2 space-y-2 text-[#707070] text-sm transition-all">
              <li
                onClick={() => setIsPersonalOpen((prev) => !prev)}
                className={
                  !isPersonalOpen
                    ? "text-[20px] font-pretendard focus:outline-none text-customGray-500"
                    : "text-[20px] font-pretendard font-semibold text-customBlack-400"
                }
              >
                비밀번호 변경
              </li>
              <li>내 프로필 변경</li>
            </ul>
          )}
          <button
            type="button"
            onClick={() => setIsActiveOpen((prev) => !prev)}
            className={
              !isActiveOpen
                ? "text-[20px] font-pretendard  text-customGray-500"
                : "text-[20px] font-pretendard font-semibold text-customBlack-400"
            }
          >
            내 활동 내역
          </button>
          <div className="text-[20px] font-pretendard text-customPink-300">
            로그 아웃
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 bg-white rounded-[8px] border border-customGray-400 w-[726px] h-[698px]">
        <div className="flex items-center gap-2 mb-4 ">
          <span className="text-[40px]">🔒</span>
          <h2 className="text-2xl font-bold">비밀번호 변경</h2>
        </div>
        <p className="text-sm text-black mb-2">
          회원님의 계정을 안전하게 보호하기 위해 정기적인 비밀번호 변경을
          권장합니다.
        </p>
        <p className="text-sm text-black mb-6">
          안전한 비밀번호 설정은 계정 보안을 강화하고, 해킹 및 부정 접속으로부터
          보호하는 데 중요한 역할을 합니다.
        </p>

        <form className="space-y-4 flex flex-col justify-center items-center">
          <div className="w-[408px] h-[74px]">
            <label className="block text-sm font-medium mb-1">
              현재 비밀번호
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>
          <div className="w-[408px] h-[74px]">
            <label className="block text-sm font-medium mb-1">
              새로운 비밀번호
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="새 비밀번호를 입력하세요"
            />
          </div>
          <div className="w-[408px] h-[74px]">
            <label className="block text-sm font-medium mb-1">
              새로운 비밀번호 확인
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-[196px] h-[39px] rounded-[8px] mt-4 px-4 py-2 bg-black text-white hover:bg-gray-800"
          >
            수정 완료
          </button>
        </form>
      </div>
    </div>
  );
}
