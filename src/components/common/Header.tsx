"use client";
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header: React.FC = () => {
  const [iconPath, setIconPath] = useState("/icons");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setIconPath("/svg");
    } else {
      setIconPath("/icons");
    }
  }, [pathname]);

  // 경로가 /일 때 설정
  const isMainPage = pathname === "/";
  const textColor = isMainPage ? "text-customGray-100" : "text-[#1a1a1a]";
  const outlineColor = isMainPage
    ? "outline-customGray-100"
    : "outline-[#202020]";
  const logoColor = isMainPage ? "/logo/white2.png" : "/logo/blue.png";

  return (
    <>
      {/* 메인 페이지일 때만 배너 표시 */}
      {isMainPage && (
        <div className="absolute inset-0 w-full h-[600px] z-[-1] ">
          <Image
            src="/main/banner.jpg"
            alt="banner"
            fill
            className="object-cover"
            priority
            suppressHydrationWarning
          />
        </div>
      )}
      <header className="w-full h-[125px] mx-auto relative overflow-hidden mt-5">
        {/* 헤더 내부 중앙 정렬 */}
        <div className="flex justify-between items-center w-full max-w-[1980px] px-2.5 mx-auto">
          <Link href="/">
            <Image src={`${logoColor}`} alt="Logo" width={110} height={50} />
          </Link>
          <div className="py-2.5 flex justify-start items-center gap-[27px]">
            <div
              className={`w-[364px] h-[31px] px-4 py-[5px] rounded-[30px] outline-1 outline-offset-[-1px] ${outlineColor} flex justify-between items-center`}
            >
              <div className="w-[138px] flex justify-between items-end">
                <div
                  className={`justify-start ${textColor} text-[13px] font-normal font-['Pretendard']`}
                >
                  어디로 떠나고 싶으신가요?
                </div>
              </div>
              <Image
                src={`${iconPath}/renz.svg`}
                alt="search"
                width={16}
                height={16}
              />
            </div>
            <div className="flex justify-start items-center gap-[27px]">
              <div className="w-5 h-5 relative overflow-hidden">
                <Image
                  src={`${iconPath}/cart3.svg`}
                  alt="cart"
                  width={20}
                  height={20}
                />
              </div>
              <div className="w-5 h-5 relative overflow-hidden">
                <Image
                  src={`${iconPath}/bell3.svg`}
                  alt="alert"
                  width={20}
                  height={20}
                />
              </div>
              <div className="w-[21px] h-[21px] relative overflow-hidden">
                <Link href="/myPage">
                  <Image
                    src={`${iconPath}/user.svg`}
                    alt="user"
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 네비게이션 링크 */}
        <div className="flex justify-start items-center w-full max-w-[1980px] h-[52px] px-2.5 gap-[30px] mx-auto">
          <div
            className={`justify-start ${textColor} text-base font-semibold font-['Pretendard']`}
          >
            <Link href="/">홈으로</Link>
          </div>
          <div
            className={`justify-start ${textColor} text-base font-semibold font-['Pretendard']`}
          >
            <Link href="/reservation">숙소 예약</Link>
          </div>
          <div
            className={`justify-start ${textColor} text-base font-semibold font-['Pretendard']`}
          >
            <Link href="/calendar">Schedule</Link>
          </div>
          <div
            className={`justify-start ${textColor} text-base font-semibold font-['Pretendard']`}
          >
            <Link href="/mateBoard">메이트 찾기</Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
