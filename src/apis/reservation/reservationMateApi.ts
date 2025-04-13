import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchMateBoardPosts(page = 0, pageSize = 8) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/mate-board/posts`, {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }
}
