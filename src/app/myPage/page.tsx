"use client";

import UserSidebar from "@/components/myPage/UserSidebar";
import PasswordChangeForm from "@/components/myPage/PasswordChangeForm";
import ProfileChangeForm from "@/components/myPage/ProfileChangeForm";
import ReservationHistory from "@/components/myPage/ReservationHistory";
import ActiveLog from "@/components/myPage/ActiveLog";
import ScheduleManager from "@/components/myPage/ScheduleManager";
import { useState } from "react";

export default function MyPage() {
  const [selectedSection, setSelectedSection] = useState<string>("개인 정보");
  const [selectedMenu, setSelectedMenu] = useState<string>("비밀번호 변경");

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
        case "내 스케줄 관리":
          return <ScheduleManager />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="max-w-[1044px] mx-auto flex gap-[122px] py-8 mb-[166px] mt-[89px]">
      <UserSidebar
        selectedSection={selectedSection}
        selectedMenu={selectedMenu}
        onSelectSection={setSelectedSection}
        onSelectItem={setSelectedMenu}
      />
      <div className="w-[726px]">{renderContent()}</div>
    </div>
  );
}
