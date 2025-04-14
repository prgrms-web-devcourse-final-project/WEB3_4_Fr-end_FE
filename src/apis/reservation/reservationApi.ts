import { areaCodeMap, cat3Map } from "@/constants/reservationCodeMap";
import {
  Accommodation,
  AccommodationResponse,
} from "@/types/searchReservation";
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

// 숙소 검색 함수
export const searchAccommodations = async (
  page: number,
  areaCode?: number,
  title?: string,
  cat3?: string
): Promise<AccommodationResponse> => {
  try {
    const response = await apiClient.get("/api/v1/accommodations/search", {
      params: {
        page, // 페이지 번호
        areaCode, // 지역 코드 (optional)
        title, // 키워드 검색 (optional)
        cat3, // 카테고리 코드 (optional)
      },
    });

    // API 응답 데이터 반환
    const data: AccommodationResponse = {
      data: response.data.data.map((item: Accommodation) => ({
        ...item,
        area: areaCode ? areaCodeMap[areaCode] : undefined, // 지역 이름 추가
        houseType: cat3 ? cat3Map[cat3] : undefined, // 숙소 타입 추가
      })),
      totalData: response.data.totalData,
    };

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch data");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
