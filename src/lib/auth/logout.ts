import api from "./axios";

export const logoutApi = async () => {
  const res = await api.post("/api/v1/auth/logout");
  localStorage.removeItem("UserData")
  return res.data;
};
