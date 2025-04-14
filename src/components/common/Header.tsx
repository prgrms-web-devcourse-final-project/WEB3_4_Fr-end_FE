"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchCalendars } from "@/apis/Schedule/CalendarNav";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [iconPath, setIconPath] = useState("/icons");

  const accessToken = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.user?.id);
  const isLoggedIn = !!accessToken;

  const isLoginPage = pathname === "/auth/login";
  const isMainPage = pathname === "/";

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (pathname === "/auth/login") return;
    setIconPath(pathname === "/" ? "/svg" : "/icons");
  }, [pathname]);

  const textColor = useMemo(
    () => (isMainPage ? "text-customGray-100" : "text-[#1a1a1a]"),
    [isMainPage]
  );
  const outlineColor = useMemo(
    () => (isMainPage ? "outline-customGray-100" : "outline-[#202020]"),
    [isMainPage]
  );
  const logoColor = useMemo(
    () => (isMainPage ? "/logo/white2.png" : "/logo/blue.png"),
    [isMainPage]
  );

  const handleScheduleClick = async () => {
    if (!userId) return;
    try {
      const calendars = await fetchCalendars();
      const myCalendars = calendars.filter(
        (c) => `${c.userId}` === `${userId}`
      );
      if (myCalendars.length > 0) {
        router.push(`/calendar/${myCalendars[0].id}`);
      } else {
        router.push("/calendar/empty");
      }
    } catch (err) {
      console.error("캘린더 이동 실패:", err);
      alert("캘린더 정보를 불러오지 못했습니다. 다시 시도해주세요.");
    }
  };

  const navItems = [
    { text: "홈으로", href: "/" },
    { text: "숙소 예약", href: "/reservation" },
    { text: "Schedule", onClick: handleScheduleClick },
    { text: "메이트 찾기", href: "/mateBoard" },
  ];

  if (isLoginPage) return null;

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
            {/* 검색창을 form으로 구성 */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = searchQuery.trim();
                if (trimmed) {
                  router.push(
                    `/reservation/search?title=${encodeURIComponent(
                      trimmed
                    )}&page=1`
                  );
                }
              }}
              className={`w-[364px] h-[31px] px-4 py-[5px] rounded-[30px] outline-1 outline-offset-[-1px] ${outlineColor} flex justify-between items-center`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="어디로 떠나고 싶으신가요?"
                className={`w-full bg-transparent border-none focus:outline-none ${textColor} text-[13px] font-normal font-['Pretendard'] placeholder:${textColor}`}
              />
              <button type="submit">
                <Image
                  src={`${iconPath}/renz.svg`}
                  alt="search"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
              </button>
            </form>

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
          {navItems.map(({ text, href, onClick }) => (
            <div
              key={text}
              className={`justify-start ${textColor} text-base font-semibold font-['Pretendard'] ${
                onClick ? "cursor-pointer" : ""
              }`}
              {...(onClick ? { onClick } : {})}
            >
              {href ? <Link href={href}>{text}</Link> : text}
            </div>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;
