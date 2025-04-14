import apiClient from "@/config/axiosConfig";

export const deleteCommentLike = async (commentId: number) => {
  try {
    console.log("댓글 좋아요 취소소 commentId:", commentId);
    const response = await apiClient.delete(
      `/api/v1/mates/comments/${commentId}/like`
    );
    return response;
  } catch (error) {
    console.error("게시글 좋아요 취소 에러:", error);
    throw error;
  }
};
