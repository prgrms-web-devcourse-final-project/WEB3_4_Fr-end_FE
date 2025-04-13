import apiClient from "@/config/axiosConfig";

export const getMateBoardDetail = async (id: number) => {
  try {
    const response = await apiClient.get(`/api/v1/mate-board/posts/${id}`);
    console.log("게시글 상세 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};
