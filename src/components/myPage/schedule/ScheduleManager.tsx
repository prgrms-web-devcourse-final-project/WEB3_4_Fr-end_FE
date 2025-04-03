import ScheduleCard from "./ScheduleCard";
import { calendarDummyData } from "@/dummyData/CalendarDummyData";

export default function ScheduleManager() {
  return (
    <div className="w-[726px] min-h-[927px] flex flex-col">
      <div className="font-pretendard font-bold text-[28px] text-customBlack-400">
        내 캘린더 관리
      </div>
      <div className="w-[726px] h-[1px] bg-customGray-400 mt-[50px] mb-[20px]" />
      <ScheduleCard calendars={calendarDummyData}/>
    </div>
  );
}
