import apiClient from "@/config/axiosConfig";

export const getMateBoardDetail = async (id: number) => {
  try {
    const response = await apiClient.get(`/api/v1/mate-board/posts/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};
