import axios from "axios";
import type { ScheduleTravelsResponse, TravelPlaceRequest } from "@/types/Scheduleindex";

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

export const createTravelPlace = async (
  scheduleId: string,
  body: TravelPlaceRequest
) => {
  const res = await axios.post(
    `http://api.sete.kr:8080/api/v1/schedules/${scheduleId}/travels`,
    body,
    {
      headers: getAuthHeader(),
    }
  );
  return res.data;
};

export const updateTravelPlace = async (
  scheduleId: string,
  travelId: number,
  body: TravelPlaceRequest
) => {
  const res = await axios.patch(
    `http://api.sete.kr:8080/api/v1/schedules/${scheduleId}/travels/${travelId}`,
    body,
    { headers: getAuthHeader() }
  );
  return res.data;
};

export const deleteTravelPlace = async (
  scheduleId: string,
  travelId: number
) => {
  const res = await axios.delete(
    `http://api.sete.kr:8080/api/v1/schedules/${scheduleId}/travels/${travelId}`,
    {
      headers: getAuthHeader(),
    }
  );
  return res.data;
};
