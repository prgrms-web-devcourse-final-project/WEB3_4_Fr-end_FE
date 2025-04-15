"use client";

import { useEffect, useState } from "react";
import MyAcc from "./myAccompany/myAcc";
import YourAcc from "./myAccompany/yourAcc";
import { MateApplication } from "@/types/myPage/MateApplication";
import api from "@/lib/auth/axios";

export default function Accompany() {
  const list = ["내가 받은 동행신청", "내가 신청한 동행신청"];
  const [selectedMenu, setSelectedMenu] =
    useState<string>("내가 받은 동행신청");
  const [applications, setApplications] = useState<MateApplication[]>([]);

  const fetchApplications = async () => {
    try {
      const endpoint =
        selectedMenu === "내가 받은 동행신청"
          ? "/api/v1/user/me/activity/mate-applications/received"
          : "/api/v1/user/me/activity/mate-applications/sent";
      const res = await api.get<MateApplication[]>(endpoint);
      setApplications(res.data);
    } catch (err) {
      console.error("신청 목록 조회 실패", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [selectedMenu]);

  const renderContent = () => {
    switch (selectedMenu) {
      case "내가 받은 동행신청":
        return (
          <YourAcc applications={applications} onChanged={fetchApplications} />
        );
      case "내가 신청한 동행신청":
        return <MyAcc applications={applications} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex font-pretendard font-semibold text-[13px] gap-[20px] hover:text-customGray-500">
        {list.map((menu) => (
          <div
            key={menu}
            onClick={() => setSelectedMenu(menu)}
            className={`cursor-pointer font-normal text-[13px] font-pretendard hover:text-customBlack-400 ${
              selectedMenu === menu
                ? "text-black font-semibold"
                : "text-customGray-500"
            }`}
          >
            {menu}
          </div>
        ))}
      </div>
      <div className="w-[726px]">{renderContent()}</div>
    </div>
  );
}
