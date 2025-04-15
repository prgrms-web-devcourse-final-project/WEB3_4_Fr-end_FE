import apiClient from "@/config/axiosConfig";

export const deletePostLike = async (postId: number) => {
  try {
    console.log("게시글 좋아요 취소 postId:", postId);
    const response = await apiClient.delete(
      `/api/v1/mate-board/posts/${postId}/like`
    );
    return response;
  } catch (error) {
    console.error("게시글 좋아요 취소 에러:", error);
    throw error;
  }
};
