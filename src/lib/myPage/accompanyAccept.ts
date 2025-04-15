import api from "@/lib/auth/axios";

export const acceptAccompany = async (
  matePostId: number,
  applicantId: number
) => {
  return await api.put(
    `/api/v1/mate-board/applications/${matePostId}/accept/${applicantId}`
  );
};
