import apiClient from "@/config/axiosConfig";
import { MatePayload } from "@/types/mateBoard/MatePayload";
// import { MatePostResponse } from "@/types/mateBoard/MatePostResponse";

export const postMateWriting = async (
  payload: MatePayload
): Promise<string> => {
  try {
    const response = await apiClient.post("/api/v1/mate-board/posts", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시글 작성 POST 에러:", error);
    throw error;
  }
};
