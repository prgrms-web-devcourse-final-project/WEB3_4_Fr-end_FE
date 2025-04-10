"use client";

import MainAbout from "@/components/main/MainAbout";
import MainBanner from "@/components/main/MainBanner";
import MainLocation from "@/components/main/MainLocation";
import MainLodging from "@/components/main/MainLodging";
import MainSchedule from "@/components/main/MainSchedule";
import { useEffect } from "react";
import api from "@/lib/auth/axios";

interface UserInfo {
  nickname: string;
  email: string;
  phone: string;
  bio: string;
  profileImage: string | null;
  mailingType: boolean;
}

export default function Home() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/v1/user/me");
        const data: UserInfo = res.data;
        console.log("유저데이터:" + data);
        localStorage.setItem("UserData", JSON.stringify(data));
      } catch (error) {
        console.error("유저 불러오기 실패", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <MainBanner />
      <MainLodging />
      <MainLocation />
      <MainSchedule />
      <MainAbout />
    </>
  );
}
