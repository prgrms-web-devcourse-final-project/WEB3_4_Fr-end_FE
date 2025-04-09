"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [iconPath, setIconPath] = useState("/icons");

  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    if (pathname === "/auth/login") return;
    setIconPath(pathname === "/" ? "/svg" : "/icons");
  }, [pathname]);

  if (pathname === "/auth/login") return null;

  const isMainPage = pathname === "/";
  const textColor = isMainPage ? "text-customGray-100" : "text-[#1a1a1a]";
  const outlineColor = isMainPage
    ? "outline-customGray-100"
    : "outline-[#202020]";
  const logoColor = isMainPage ? "/logo/white2.png" : "/logo/blue.png";

  return (
    <>
      {isMainPage && (
        <div className="absolute inset-0 w-full h-[600px] z-[-1]">
          <Image
            src="/main/banner.jpg"
            alt="banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <header className="mx-52 h-[125px] relative overflow-hidden mt-5">
        <div className="flex justify-between items-center w-full max-w-[1980px] px-2.5 mx-auto">
          <Link href="/">
            <Image src={logoColor} alt="Logo" width={110} height={50} />
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
              <div
                className={`w-5 h-5 relative ${!isLoggedIn ? "invisible" : ""}`}
              >
                <Link href="/chat">
                  <Image
                    src={`${iconPath}/chat.svg`}
                    alt="chat"
                    width={20}
                    height={20}
                    className={isMainPage ? "invert" : ""}
                  />
                </Link>
              </div>
              <div
                className={`w-5 h-5 relative ${!isLoggedIn ? "invisible" : ""}`}
              >
                <Image
                  src={`${iconPath}/bell3.svg`}
                  alt="alert"
                  width={20}
                  height={20}
                />
              </div>
              <div className="w-[21px] h-[21px] relative">
                <Link href={isLoggedIn ? "/myPage" : "/auth/login"}>
                  <Image
                    src={`${iconPath}/${isLoggedIn ? "user.svg" : "login.png"}`}
                    alt="user"
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-center w-full max-w-[1980px] h-[52px] px-2.5 gap-[30px] mx-auto">
          {["홈으로", "숙소 예약", "Schedule", "메이트 찾기"].map(
            (text, idx) => {
              const hrefs = ["/", "/reservation", "/calendar/1", "/mateBoard"];
              return (
                <div
                  key={text}
                  className={`justify-start ${textColor} text-base font-semibold font-['Pretendard']`}
                >
                  <Link href={hrefs[idx]}>{text}</Link>
                </div>
              );
            }
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
