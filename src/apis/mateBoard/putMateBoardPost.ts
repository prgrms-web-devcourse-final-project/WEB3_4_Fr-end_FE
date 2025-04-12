import apiClient from "@/config/axiosConfig";
import { MatePayload } from "@/types/mateBoard/MatePayload";

export const putMateBoardPost = async (
  postId: number,
  payload: MatePayload
): Promise<{ postId: number }> => {
  try {
    const response = await apiClient.put<number>(
      `/api/v1/mate-board/posts/${postId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { postId: response.data };
  } catch (error) {
    console.error("게시글 수정 에러:", error);
    throw error;
  }
};
