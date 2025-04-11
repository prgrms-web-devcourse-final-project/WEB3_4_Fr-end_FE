import apiClient from "@/config/axiosConfig";

interface DeletePostResponse {
  message: string;
}

export const deletePost = async (
  postId: number
): Promise<DeletePostResponse> => {
  try {
    const response = await apiClient.delete(
      `/api/v1/mate-board/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 오류:", error);
    throw error;
  }
};
