import apiClient from "@/config/axiosConfig";

export const postCommentLike = async (postId: number, commentId: number) => {
  try {
    console.log("댓글 좋아요 commentId:", commentId);
    const response = await apiClient.post(
      `/api/v1/mate-board/posts/${postId}/comments/${commentId}/like`
    );
    return response;
  } catch (error) {
    console.error("게시글 좋아요 에러:", error);
    throw error;
  }
};
