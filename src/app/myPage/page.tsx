"use client";

import { useEffect, useState } from "react";
import api from "@/lib/auth/axios";
import UserSidebar from "@/components/myPage/UserSidebar";
import PasswordChangeForm from "@/components/myPage/password/PasswordChangeForm";
import ProfileChangeForm from "@/components/myPage/profile/ProfileChangeForm";
import ReservationHistory from "@/components/myPage/reservation/ReservationHistory";
import ActiveLog from "@/components/myPage/active/ActiveLog";
import ScheduleManager from "@/components/myPage/schedule/ScheduleManager";

type UserInfo = {
  socialType: string;
};

export default function MyPage() {
  const [selectedSection, setSelectedSection] = useState<string>("개인 정보");
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/v1/user/me");
        const userData: UserInfo = res.data;
        setUser(userData);

        const defaultMenu =
          userData.socialType === "GOOGLE" ? "내 프로필 변경" : "비밀번호 변경";
        setSelectedMenu(defaultMenu);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };

    fetchUser();
  }, []);

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);

    if (section === "개인 정보") {
      if (user?.socialType === "GOOGLE") {
        setSelectedMenu("내 프로필 변경");
      } else {
        setSelectedMenu("비밀번호 변경");
      }
    } else if (section === "내 활동 내역") {
      setSelectedMenu("내 예약 내역");
    }
  };

  const renderContent = () => {
    if (selectedSection === "개인 정보") {
      switch (selectedMenu) {
        case "비밀번호 변경":
          return <PasswordChangeForm />;
        case "내 프로필 변경":
          return <ProfileChangeForm />;
        default:
          return null;
      }
    } else if (selectedSection === "내 활동 내역") {
      switch (selectedMenu) {
        case "내 예약 내역":
          return <ReservationHistory />;
        case "내 활동 내역":
          return <ActiveLog />;
        case "내 캘린더 관리":
          return <ScheduleManager />;
        default:
          return null;
      }
    }
    return null;
  };

  if (!user || !selectedMenu) {
    return (
      <div className="w-[726px] min-h-[770px] flex flex-col items-center mt-10">
        <div className="flex flex-col items-center text-center font-paperlogy text-[60xp] font-bold">
          마이페이지 로딩중...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1044px] mx-auto flex gap-[122px] py-8 mb-[166px] mt-[89px]">
      <UserSidebar
        selectedSection={selectedSection}
        selectedMenu={selectedMenu}
        onSelectSection={handleSelectSection}
        onSelectItem={setSelectedMenu}
      />
      <div className="w-[726px]">{renderContent()}</div>
    </div>
  );
}
