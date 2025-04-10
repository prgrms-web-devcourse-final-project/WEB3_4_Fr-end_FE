import apiClient from "@/config/axiosConfig";

export const getComments = async (mateId: number) => {
  try {
    const response = await apiClient.get(
      `/api/v1/mate-board/posts/${mateId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};
