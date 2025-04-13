import apiClient from "@/config/axiosConfig";
import { MatePayload } from "@/types/mateBoard/MatePayload";
export const postMateWriting = async (
  payload: MatePayload
): Promise<{ postId: number }> => {
  try {
    const response = await apiClient.post("/api/v1/mate-board/posts", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { postId: response.data };
  } catch (error) {
    console.error("게시글 작성 POST 에러:", error);
    throw error;
  }
};
