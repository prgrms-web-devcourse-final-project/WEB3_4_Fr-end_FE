"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/auth/axios";
import { useAuthStore } from "@/store/useAuthStore";

export default function SocialLogin() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);
  const [dotCount, setDotCount] = useState<number>(1);
  const setUser = useAuthStore((state) => state.setUser);
  const [socialType, setSocialType] = useState<string>("GOOGLE");

  useEffect(() => {
    const typeFromParams = searchParams.get("socialType");
    const typeFromStorage =
      typeof window !== "undefined" ? localStorage.getItem("socialType") : null;

    setSocialType(typeFromParams ?? typeFromStorage ?? "GOOGLE");
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleSocialLogin = async () => {
      if (!code) return;

      try {
        const res = await api.post("/api/v1/auth/social-login", {
          socialType,
          code,
        });
        console.log("code:", code);
        console.log("socialType:", socialType);

        const { accessToken, refreshToken, needAdditionalInfo } = res.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setTokens(accessToken, refreshToken);

        const userRes = await api.get("/api/v1/user/me");
        const userData = userRes.data;
        setUser(userData);
        localStorage.setItem("UserData", JSON.stringify(userData));

        router.push(needAdditionalInfo ? "/auth/completeProfile" : "/");
        localStorage.removeItem("socialType");
      } catch (err) {
        console.error("소셜 로그인 실패:", err);
      }
    };

    handleSocialLogin();
  }, [code, router, setTokens, socialType, setUser]);

  const dots = ".".repeat(dotCount);

  return (
    <div className="w-[726px] min-h-[770px] flex flex-col items-center mt-10">
      <div className="flex flex-col items-center text-center font-paperlogy text-[60xp] font-bold">
        로그인 처리 중입니다{dots}
      </div>
    </div>
  );
}
