import { fetchScheduleTravels, deleteTravelPlace } from "@/apis/Schedule/PlanSchedule";
import type { ScheduleTravelsResponse } from "@/types/Scheduleindex";

export const getPlanEventData = async (
  scheduleId: string
): Promise<ScheduleTravelsResponse | null> => {
  try {
    const data = await fetchScheduleTravels(scheduleId);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const handleDeleteTravel = async (
  scheduleId: string,
  travelId: number
): Promise<boolean> => {
  try {
    await deleteTravelPlace(scheduleId, travelId);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
