import apiClient from "@/config/axiosConfig";
import { MateComment } from "@/types/mateBoard/MateComment";

export const postComment = async (
  mateId: number,
  payload: { content: string }
): Promise<MateComment[]> => {
  try {
    console.log("API 호출 시 mateId:", mateId);
    const response = await apiClient.post(
      `/api/v1/mate-board/posts/${mateId}/comments`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("댓글 작성 POST 에러:", error);
    throw error;
  }
};
