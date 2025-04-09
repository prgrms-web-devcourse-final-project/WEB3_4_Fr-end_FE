import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/token/refresh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = res.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        const setTokens = useAuthStore.getState().setTokens;
        setTokens(accessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        console.error("리프레시 토큰 재발급 실패:", refreshErr);

        const clearTokens = useAuthStore.getState().clearTokens;
        clearTokens();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/auth/login";

        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
