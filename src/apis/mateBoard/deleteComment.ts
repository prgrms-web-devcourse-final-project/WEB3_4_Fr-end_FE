import apiClient from "@/config/axiosConfig";

interface DeleteCommentResponse {
  message: string;
}
export const deleteComment = async (
  postId: number,
  commentId: number
): Promise<DeleteCommentResponse> => {
  try {
    const response = await apiClient.delete(
      `/api/v1/mate-board/posts/${postId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};
