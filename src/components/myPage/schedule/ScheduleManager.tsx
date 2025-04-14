import { useEffect, useState } from "react";
import ScheduleCard from "./ScheduleCard";
// import { calendarDummyData } from "@/dummyData/CalendarDummyData";
import { CalendarApiResponse, CalendarData } from "@/types/ScheuduleData";
import api from "@/lib/auth/axios";

export default function ScheduleManager() {
  const [calendars, setCalendars] = useState<CalendarData[]>([]);

  const handleDeleteCalendar = (id: number) => {
    setCalendars((prev) => prev.filter((cal) => cal.id !== id));
  };

  const transformCalendars = (
    apiData: CalendarApiResponse[]
  ): CalendarData[] => {
    return apiData.map((item) => ({
      id: item.calendarId,
      name: item.calendarTitle,
      description: item.note,
      mates: item.sharedUserNicknames.map((nickname: string) => ({
        userNickname: nickname,
      })),
    }));
  };
  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const res = await api.get("/api/v1/user/me/activity/calendars");
        setCalendars(transformCalendars(res.data));
      } catch (err) {
        console.error("캘린더 불러오기 실패", err);
      }
    };

    fetchCalendars();
  }, []);

  return (
    <div className="w-[726px] min-h-[927px] flex flex-col">
      <div className="font-pretendard font-bold text-[28px] text-customBlack-400">
        내 캘린더 관리
      </div>
      <div className="w-[726px] h-[1px] bg-customGray-400 mt-[50px] mb-[20px]" />
      <ScheduleCard calendars={calendars} onDelete={handleDeleteCalendar} />
    </div>
  );
}
