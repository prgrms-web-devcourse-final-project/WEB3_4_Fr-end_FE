"use client";

import Image from "next/image";
import MenuSection from "./MenuSection";
import { UserDummyData } from "@/dummyData/UserDummyData";

interface UserSidebarProps {
  selectedSection: string;
  selectedMenu: string;
  onSelectSection: (section: string) => void;
  onSelectItem: (item: string) => void;
}

export default function UserSidebar({
  selectedSection,
  selectedMenu,
  onSelectSection,
  onSelectItem,
}: UserSidebarProps) {
  return (
    <div className="w-[197px] h-[447px] flex flex-col items-center">
      <Image
        src={`/defaultAvatar/${UserDummyData.avatar}`}
        alt="user"
        width={196}
        height={196}
        className="rounded-full"
      />
      <p className="mt-4 text-black text-xl">반갑습니다!</p>
      <div className="flex">
        <span className="text-customViloet-200 text-xl">
          {UserDummyData.nickname}
        </span>
        <p className="text-black text-xl">님!</p>
      </div>
      <div className="mt-6 w-full border-t border-gray-300 pt-4 flex flex-col mb-[10px]">
        <div className="ml-[50px]">
          <MenuSection
            title="개인 정보"
            items={["비밀번호 변경", "내 프로필 변경"]}
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
          <div className="text-[20px] font-pretendard text-red-600 hover:font-bold">
            로그 아웃
          </div>
        </div>
      </div>
    </div>
  );
}
