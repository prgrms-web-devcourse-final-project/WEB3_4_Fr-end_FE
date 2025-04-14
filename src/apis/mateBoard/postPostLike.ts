import apiClient from "@/config/axiosConfig";

export const postLike = async (postId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/mateposts/${postId}/likes`);
    console.log("게시글 좋아요 성공");
    console.log("게시글 좋아요 postId:", postId);
    return response;
  } catch (error) {
    console.error("게시글 좋아요 에러:", error);
    throw error;
  }
};
