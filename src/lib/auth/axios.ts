import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (refreshToken) {
//           const res = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/token/refresh`,
//             { refreshToken }
//           );

//           const { accessToken, refreshToken: newRefreshToken } = res.data;

//           localStorage.setItem("accessToken", accessToken);
//           localStorage.setItem("refreshToken", newRefreshToken);

//           originalRequest.headers.Authorization = `Bearer ${accessToken}`;

//           return api(originalRequest);
//         }
//       } catch (refreshErr) {
//         console.error("리프레시 실패:", refreshErr);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
