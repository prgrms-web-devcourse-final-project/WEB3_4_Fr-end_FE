import apiClient from "@/config/axiosConfig";

export const getMateBoardPosts = async () => {
  try {
    const response = await apiClient.get("/api/v1/mate-board/posts", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};
