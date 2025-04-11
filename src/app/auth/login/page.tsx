"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/auth/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export default function Login() {
  const [bgImage, setBgImage] = useState<string>("/loginHero/img1.jpg");
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberId, setRememberId] = useState<boolean>(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);

  const router = useRouter();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 10) + 1;
    setBgImage(`/loginHero/img${randomIndex}.jpg`);
    const savedId = localStorage.getItem("rememberedLoginId");
    if (savedId) {
      setLoginId(savedId);
      setRememberId(true);
    }
  }, []);
  const handleLogin = async () => {
    try {
      const res = await api.post(
        "/api/v1/auth/local-login",
        { loginId, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (rememberId) {
        localStorage.setItem("rememberedLoginId", loginId);
      } else {
        localStorage.removeItem("rememberedLoginId");
      }

      const { accessToken, refreshToken } = res.data;

      setTokens(accessToken, refreshToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const userRes = await api.get("/api/v1/user/me");
      const userData = userRes.data;
      setUser(userData);
      localStorage.setItem("UserData", JSON.stringify(userData));

      toast.success("로그인 성공!");
      if (userData.status === "REGISTERED") {
        router.push("/");
      } else {
        router.push("/auth/completeProfile");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "로그인 실패!");
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await api.get("/api/v1/auth/redirect-url", {
        params: {
          socialType: "GOOGLE",
        },
        headers: {},
      });
      const { redirectUri } = res.data;

      if (redirectUri) {
        const joiner = redirectUri.includes("?") ? "&" : "?";
        window.location.href = `${redirectUri}${joiner}socialType=GOOGLE`;
      } else {
        console.error("리디렉션 URL 없음.");
      }
    } catch (error) {
      console.error(`Error 발생: ${error}`);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const res = await api.get("/api/v1/auth/redirect-url", {
        params: {
          socialType: "KAKAO",
        },
        headers: {},
      });
      const { redirectUri } = res.data;
      if (redirectUri) {
        localStorage.setItem("socialType", "KAKAO");
        const joiner = redirectUri.includes("?") ? "&" : "?";
        window.location.href = `${redirectUri}${joiner}socialType=KAKAO`;
      } else {
        console.error("리디렉션 URL 없음.");
      }
    } catch (error) {
      console.error(`Error 발생: ${error}`);
    }
  };

  const handleNaverLogin = async () => {
    try {
      const res = await api.get("/api/v1/auth/redirect-url", {
        params: {
          socialType: "NAVER",
        },
        headers: {},
      });
      const { redirectUri } = res.data;
      if (redirectUri) {
        localStorage.setItem("socialType", "NAVER");
        const joiner = redirectUri.includes("?") ? "&" : "?";
        window.location.href = `${redirectUri}${joiner}socialType=NAVER`;
      } else {
        console.error("리디렉션 URL 없음.");
      }
    } catch (error) {
      console.error(`Error 발생: ${error}`);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden m-0 p-0">
      <div className="fixed inset-0 w-screen h-screen overflow-hidden m-0 p-0 z-0">
        <Image
          src={bgImage}
          alt="Hero Image"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="absolute inset-0 flex justify-end items-center pr-[30%] z-10">
        <div className="flex flex-col items-center bg-white w-[90vw] max-w-[514px] h-[547px] rounded-xl shadow-xl">
          <Link href="/">
            <Image
              src="/logo/blue.png"
              alt="Logo"
              width={180}
              height={60}
              className="w-[180px] h-[60px] mb-8 mt-[31px]"
            />
          </Link>
          <input
            type="email"
            placeholder="이메일 주소"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="border w-[380px] h-[50px] p-2 rounded-t-[8px]  outline-customGray-300 focus:outline-customGray-600"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-t-0 w-[380px] h-[50px] mb-4 p-2 rounded-b-[8px]  outline-customGray-300 focus:outline-customGray-600"
          />
          <div className="flex w-full items-center pl-[67px] mb-4 cursor-pointer">
            <input
              type="checkbox"
              id="remember"
              checked={rememberId}
              onChange={(e) => setRememberId(e.target.checked)}
              className="mr-[5px] align-middle"
            />
            <label
              htmlFor="remember"
              className="font-normal text-[13px] text-customGray-600 hover:text-customBlack-400 hover:font-bold cursor-pointer"
            >
              아이디 저장
            </label>
          </div>
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleLogin}
              className="bg-customGray-100 w-[150px] h-[48px] text-black px-[49px] py-[12px] rounded-[8px] font-pretendard font-normal text-[20px] hover:bg-customBlue-200 hover:text-white cursor-pointer"
            >
              로그인
            </button>
            <Link href="/auth/register">
              <button className="bg-customGray-400 w-[150px] h-[48px] text-white px-[40px] py-[12px] rounded-[8px] font-pretendard font-normal text-[20px]  hover:bg-customViloet-200 cursor-pointer">
                회원가입
              </button>
            </Link>
          </div>
          <div className="flex gap-[23px] justify-center items-center">
            <div className="w-[163px] h-[1px] bg-customGray-400" />
            <div className="text-center text-sm text-gray-500 mb-2">또는</div>
            <div className="w-[163px] h-[1px] bg-customGray-400" />
          </div>

          <div className="flex justify-center gap-4">
            <Image
              src="/login/kakao.svg"
              alt="kakao"
              width={50}
              height={50}
              className="cursor-pointer"
              onClick={handleKakaoLogin}
            />

            <Image
              src="/login/naver.png"
              alt="naver"
              width={50}
              height={50}
              className="cursor-pointer"
              onClick={handleNaverLogin}
            />

            <Image
              src="/login/google.svg"
              alt="google"
              width={50}
              height={50}
              className="cursor-pointer"
              onClick={handleGoogleLogin}
            />
          </div>
          <div className="mt-[100px] w-full text-center text-sm text-customGray-600 z-10 opacity-80">
            ⓒ 2025 PlanIt. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
