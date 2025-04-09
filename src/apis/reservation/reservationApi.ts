import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 숙소 데이터 가져오기
export const fetchAccommodations = async () => {
  try {
    const response = await apiClient.get("/api/v1/accommodations");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    throw error;
  }
};

// 특정 숙소 데이터 가져오기
export const fetchAccommodationById = async (id: number) => {
  try {
    const response = await apiClient.get(`/api/v1/accommodations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching accommodation with ID ${id}:`, error);
    throw error;
  }
};
