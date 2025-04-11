import api from "./axios";
import { useAuthStore } from "@/store/useAuthStore";

export const logoutApi = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    await api.post(
      "/api/v1/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.error("서버 로그아웃 실패", err);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("auth-storage");
    localStorage.removeItem("UserData");
    const clearTokens = useAuthStore.getState().clearTokens;
    clearTokens();
  }
};
