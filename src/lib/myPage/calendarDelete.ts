import api from "@/lib/auth/axios";

export const deleteCalendar = async (id: number) => {
  try {
    const res = await api.delete(`/api/v1/calendar/${id}`);
    console.log("삭제 성공 응답:", res.status);
    return res;
  } catch (err) {
    console.error("deleteCalendar 실패", err);
    throw err;
  }
};
