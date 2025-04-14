import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  phone: string;
  birthDate: string;
  gender: string;
  profileImage: string | null;
  mailingType: boolean;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  checkExpiration: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setUser: (user) => set({ user }),

      setTokens: (accessToken, refreshToken) => {
        const expirationTime = new Date().getTime() + 1000 * 60 * 60;
        localStorage.setItem("auth-expiration", expirationTime.toString());
        set({ accessToken, refreshToken });
      },

      clearTokens: () => {
        localStorage.removeItem("auth-expiration");
        set({ accessToken: null, refreshToken: null, user: null });
      },

      checkExpiration: () => {
        const now = new Date().getTime();
        const expiration = localStorage.getItem("auth-expiration");

        if (expiration && now > Number(expiration)) {
          get().clearTokens();
          return false;
        }
        return true;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
