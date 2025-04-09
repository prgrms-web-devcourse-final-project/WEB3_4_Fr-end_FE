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
          socialType: "GOOGLE",
          code,
        });

        const { accessToken, refreshToken, needAdditionalInfo } = res.data;

        console.log("🟢 로그인 응답 성공");
        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);
        console.log("needAdditionalInfo:", needAdditionalInfo);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setTokens(accessToken, refreshToken);

        if (needAdditionalInfo) {
          router.push("/auth/completeProfile");
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("소셜 로그인 실패:", err);
      }
    };

    handleSocialLogin();
  }, [code, router, setTokens]);

  const dots = ".".repeat(dotCount);

  return (
    <div className="w-[726px] min-h-[770px] flex flex-col items-center mt-10">
      <div className="flex flex-col items-center text-center font-paperlogy text-[60xp] font-bold">
        로그인 처리 중입니다{dots}
      </div>
    </div>
  );
}
