"use client";

import Image from "next/image";
import MenuSection from "./MenuSection";
import { logoutApi } from "@/lib/auth/logout";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/auth/axios";

interface UserSidebarProps {
  selectedSection: string;
  selectedMenu: string;
  onSelectSection: (section: string) => void;
  onSelectItem: (item: string) => void;
}

type UserInfo = {
  nickname: string;
  email: string;
  phone: string;
  bio: string;
  profileImage: string | null;
  socialType: string;
};

export default function UserSidebar({
  selectedSection,
  selectedMenu,
  onSelectSection,
  onSelectItem,
}: UserSidebarProps) {
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const router = useRouter();

  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/v1/user/me");
        setUser(res.data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
      clearTokens();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("auth/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-8">유저 정보를 불러오는 중입니다...</div>
    );
  }

  return (
    <div className="w-[197px] h-[447px] flex flex-col items-center">
      <Image
        src={user.profileImage || "/defaultAvatar/31.png"}
        alt="user"
        width={196}
        height={196}
        className="rounded-full"
      />
      <p className="mt-4 text-black text-xl">반갑습니다!</p>
      <div className="flex">
        <span className="text-customViloet-200 text-xl">{user.nickname}</span>
        <p className="text-black text-xl">님!</p>
      </div>

      <div className="mt-6 w-full border-t border-gray-300 pt-4 flex flex-col mb-[10px]">
        <div className="ml-[50px]">
          <MenuSection
            title="개인 정보"
            items={
              user.socialType === "GOOGLE"
                ? ["내 프로필 변경"]
                : ["비밀번호 변경", "내 프로필 변경"]
            }
            selectedSection={selectedSection}
            selectedMenu={selectedMenu}
            onSelectSection={onSelectSection}
            onSelectItem={onSelectItem}
          />
          <MenuSection
            title="내 활동 내역"
            items={["내 예약 내역", "내 활동 내역", "내 캘린더 관리"]}
            selectedSection={selectedSection}
            selectedMenu={selectedMenu}
            onSelectSection={onSelectSection}
            onSelectItem={onSelectItem}
          />
          <div
            onClick={handleLogout}
            className="text-[20px] font-pretendard text-red-600 hover:font-bold cursor-pointer mt-4"
          >
            로그 아웃
          </div>
        </div>
      </div>
    </div>
  );
}
