import apiClient from "@/config/axiosConfig";

export const postCommentLike = async (commentId: number) => {
  try {
    console.log("댓글 좋아요 commentId:", commentId);
    const response = await apiClient.post(
      `/api/v1/mates/comments/${commentId}/like`
    );
    return response;
  } catch (error) {
    console.error("게시글 좋아요 에러:", error);
    throw error;
  }
};
