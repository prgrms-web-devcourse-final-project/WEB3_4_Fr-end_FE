import apiClient from "@/config/axiosConfig";

export const getComments = async (postId: number) => {
  try {
    const response = await apiClient.get(
      `/api/v1/mate-board/posts/${postId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};
