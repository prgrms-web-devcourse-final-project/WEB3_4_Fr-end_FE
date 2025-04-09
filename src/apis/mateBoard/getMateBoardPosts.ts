import apiClient from "@/config/axiosConfig";
import { PageResponse } from "@/types/mateBoard/PageResponse";
import { GetMateBoardPostsParams } from "@/types/mateBoard/MateBoardPostsParams";
import { MateCardData } from "@/types/mateBoard/MateCardData";

export const getMateBoardPosts = async (
  params: GetMateBoardPostsParams = {}
): Promise<PageResponse<MateCardData>> => {
  try {
    const response = await apiClient.get("/api/v1/mate-board/posts", {
      params,
    });
    console.log("게시글 목록 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 에러:", error);
    throw error;
  }
};
