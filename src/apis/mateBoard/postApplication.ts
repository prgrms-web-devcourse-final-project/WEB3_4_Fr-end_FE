import apiClient from "@/config/axiosConfig";

export const postApplication = async (postId: number) => {
  try {
    console.log("동행신청 postId:", postId);
    const response = await apiClient.post(`/mate-board/applications/${postId}`);
    return response.data;
  } catch (error) {
    console.error("동행 신청 POST 에러:", error);
    throw error;
  }
};
