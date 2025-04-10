"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/auth/axios";
import InputField from "@/components/login/register/InputField";
import BirthDateField from "@/components/login/register/BirthDateField";
import SelectField from "@/components/login/register/SelectField";
import CheckboxField from "@/components/login/register/CheckboxField";
import { SocialSignupFormData } from "@/types/loginForm";
import { useEffect, useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function CompleteProfilePage() {
  const [mailingAgree, setMailingAgree] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<SocialSignupFormData>({ mode: "onChange" });

  const handleBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && isDirty) {
        e.preventDefault();
        toast.error("회원가입을 먼저 완료해주세요!");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isDirty]);

  const onSubmit = async (data: SocialSignupFormData) => {
    try {
      const birthDate = `${data.birthYear}-${data.birthMonth.padStart(
        2,
        "0"
      )}-${data.birthDay.padStart(2, "0")}`;

      const payload = {
        email: data.email,
        nickname: data.nickname,
        phone: data.phone,
        birthDate,
        gender:
          data.gender === "남자"
            ? "MALE"
            : data.gender === "여자"
            ? "FEMALE"
            : "UNSPECIFIED",
        mailingType: mailingAgree,
      };

      window.removeEventListener("beforeunload", handleBeforeUnload);

      await api.patch("/api/v1/user/me/first-info", payload);
      router.push("/");
    } catch (err) {
      console.error("추가 정보 제출 실패", err);
      toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[420px] mx-auto flex flex-col gap-4"
      >
        <InputField
          label="닉네임"
          name="nickname"
          placeholder="닉네임을 입력해 주세요"
          register={register}
          rules={{ required: "닉네임은 필수 입력입니다." }}
          error={errors.nickname?.message}
        />

        <InputField
          label="이메일"
          name="email"
          placeholder="이메일을 입력해 주세요"
          register={register}
          rules={{
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          }}
          error={errors.email?.message}
        />

        <BirthDateField register={register} errors={errors} />

        <InputField
          label="휴대폰 번호"
          name="phone"
          placeholder="숫자만 입력해주세요"
          register={register}
          rules={{
            required: "휴대폰 번호는 필수입니다.",
            pattern: {
              value: /^\d{10,11}$/,
              message: "- 제외하고 숫자만 입력해주세요.",
            },
          }}
          error={errors.phone?.message}
        />

        <SelectField control={control} errors={errors} name="gender" />

        <CheckboxField
          id="email-agree"
          label="이메일 메일링 서비스에 동의합니다."
          checked={mailingAgree}
          onChange={(e) => setMailingAgree(e.target.checked)}
        />

        <button
          type="submit"
          className="w-full h-[52px] bg-[#80caff] text-white text-[20px] font-bold rounded-lg mt-4 mb-[100px]"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
