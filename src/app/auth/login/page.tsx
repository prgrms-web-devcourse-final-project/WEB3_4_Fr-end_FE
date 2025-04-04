"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Login() {
  const [bgImage, setBgImage] = useState("/loginHero/img1.jpg");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 10) + 1;
    setBgImage(`/loginHero/img${randomIndex}.jpg`);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden m-0 p-0">
      {/* 배경 이미지 */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden m-0 p-0 z-0">
        <Image
          src={bgImage}
          alt="Hero Image"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* 로그인 박스 wrapper */}
      <div className="absolute inset-0 flex justify-end items-center pr-[30%] z-10">
        <div className="flex flex-col items-center bg-white w-[90vw] max-w-[514px] h-[547px] rounded-xl shadow-xl">
          {/* 폼 내용 */}
          <Link href="/">
            <Image
              src="/logo/blue.png"
              alt="Logo"
              width={180}
              height={60}
              className="w-[180px] h-[60px] mb-8 mt-[31px]"
            />
          </Link>
          <input
            type="email"
            placeholder="이메일 주소"
            className="border w-[380px] h-[50px] p-2 rounded-t-[8px]"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="border border-t-0 w-[380px] h-[50px] mb-4 p-2 rounded-b-[8px]"
          />

          <div className="flex w-full items-start justify-center pl-[67px] mb-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember">아이디 저장</label>
          </div>

          <div className="flex gap-4 mb-4">
            <button className="bg-customGray-100 w-[150px] h-[48px] text-black px-[49px] py-[12px] rounded-[8px] font-pretendard font-normal text-[20px]">
              로그인
            </button>
            <button className="bg-customGray-400 w-[150px] h-[48px] text-white px-[40px] py-[12px] rounded-[8px] font-pretendard font-normal text-[20px]">
              회원가입
            </button>
          </div>
          <div className="flex gap-[23px] justify-center items-center">
            <div className="w-[163px] h-[1px] bg-customGray-400" />
            <div className="text-center text-sm text-gray-500 mb-2">또는</div>
            <div className="w-[163px] h-[1px] bg-customGray-400" />
          </div>

          <div className="flex justify-center gap-4">
            <Image src="/login/kakao.svg" alt="kakao" width={50} height={50} />
            <Image src="/login/naver.png" alt="naver" width={50} height={50} />
            <Image
              src="/login/google.svg"
              alt="google"
              width={50}
              height={50}
            />
          </div>
          <div className="mt-[100px] w-full text-center text-sm text-customGray-600 z-10 opacity-80">
            ⓒ 2025 PlanIt. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
