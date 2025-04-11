import toast from "react-hot-toast";
import { createCalendar, deleteCalendarById, updateCalendar } from "@/apis/Schedule/CalendarNav";
import type { NavItem } from "@/types/Scheduleindex";

// 캘린더 생성
export const addNewCalendar = async (
  userId: string,
  setItems: React.Dispatch<React.SetStateAction<NavItem[]>>
) => {
  try {
    const created = await createCalendar("캘린더", userId);
    setItems(prev => [...prev, {
      id: created.id.toString(),
      label: created.calendarTitle,
      shareOpen: false
    }]);
  } catch (err) {
    console.error(err);
    toast.error("캘린더 생성에 실패했습니다.");
  }
};


/** 캘린더 삭제 */
export const deleteCalendar = async (
  id: string,
  userId: string,
  setItems: React.Dispatch<React.SetStateAction<NavItem[]>>
) => {
  try {
    await deleteCalendarById(id, userId);
    setItems(prev => prev.filter(item => item.id !== id));
  } catch (err) {
    console.error(err);
    toast.error("캘린더 삭제에 실패했습니다.");
  }
};

// 캘린더 이름 수정정
export const editCalendarTitle = async (
  id: string,
  userId: string,
  newLabel: string,
  setItems: React.Dispatch<React.SetStateAction<NavItem[]>>,
  onComplete: () => void
) => {
  try {
    const now = new Date().toISOString();
    await updateCalendar(id, userId, {
      calendarTitle: newLabel,
      startDate: now,
      endDate: now,
      alertTime: now,
      note: ""
    });

    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    );
    onComplete();
  } catch (err) {
    console.error(err);
    toast.error("캘린더 이름 수정에 실패했습니다.");
  }
};

// URL 복사사
export const copyCalendarUrl = async (id: string) => {
  try {
    const url = `${window.location.origin}/calendar/${id}`;
    await navigator.clipboard.writeText(url);
    toast.success("URL이 복사되었습니다!");
  } catch (err) {
    console.error(err);
    toast.error("URL 복사에 실패했습니다.");
  }
};
