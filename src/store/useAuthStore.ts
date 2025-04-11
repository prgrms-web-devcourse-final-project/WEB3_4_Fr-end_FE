import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  phone: string;
  birthDate: string;
  gender: string;
  profileImage: string | null;
  mailingType: boolean;
  socialType: string | null;
  bio: string | null;
  status: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearTokens: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
