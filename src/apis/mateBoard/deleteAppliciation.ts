import apiClient from "@/config/axiosConfig";
import { PostApplicationResponse } from "@/types/mateBoard/PostApplicationResponse";

export const deleteApplication = async (
  postId: number
): Promise<PostApplicationResponse> => {
  try {
    console.log("동행신청 postId:", postId);
    const response = await apiClient.delete(
      `/api/v1/mate-board/applications/${postId}`
    );
    return response;
  } catch (error) {
    console.error("동행 신청 POST 에러:", error);
    throw error;
  }
};
