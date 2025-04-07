import api from "./axios";

export const logoutApi = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
