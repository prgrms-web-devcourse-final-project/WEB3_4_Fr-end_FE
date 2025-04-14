import axios from "axios";
import type { ScheduleTravelsResponse } from "@/types/Scheduleindex";

const getAuthHeader = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken ? { Authorization: `Bearer ${refreshToken}` } : {};
};

export const fetchScheduleTravels = async (
  scheduleId: string
): Promise<ScheduleTravelsResponse> => {
  const res = await axios.get(
    `http://api.sete.kr:8080/api/v1/schedules/${scheduleId}/travels`,
    {
      headers: getAuthHeader(),
    }
  );
  return res.data;
};
