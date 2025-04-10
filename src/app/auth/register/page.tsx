"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/login/register/InputField";
import BirthDateField from "@/components/login/register/BirthDateField";
import CheckboxField from "@/components/login/register/CheckboxField";
import SelectField from "@/components/login/register/SelectField";
import { EmailSignupFormData } from "@/types/loginForm";
import api from "@/lib/auth/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

function validatePasswordComplexity(value: string) {
  const pattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return (
    pattern.test(value) ||
    "영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다."
  );
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<EmailSignupFormData>({
    mode: "onChange",
  });
  const [mailingAgree, setMailingAgree] = useState<boolean>(false);
  const passwordValue = watch("password");
  const router = useRouter();

  const onSubmit = async (data: EmailSignupFormData) => {
    const birthDate = `${data.birthYear}-${data.birthMonth.padStart(
      2,
      "0"
    )}-${data.birthDay.padStart(2, "0")}`;
    const gender = data.gender === "남자" ? "MALE" : "FEMALE";

    const payload = {
      loginId: data.username,
      password: data.password,
      nickname: data.nickname,
      email: data.email,
      birthDate,
      phone: data.phone,
      gender,
      mailingType: mailingAgree,
    };

    try {
      await api.post("/api/v1/auth/local-register", payload);
      toast.success("회원가입이 완료되었습니다!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "회원가입이 실패했습니다!");
      } else {
        toast.error("알 수 없는 에러가 발생하였습니다!");
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        className="w-[408px] flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="아이디"
          placeholder="아이디를 입력해 주세요."
          name="username"
          register={register}
          rules={{
            required: "아이디는 필수 입력입니다.",
            minLength: { value: 4, message: "아이디는 4자 이상이어야 합니다." },
            pattern: {
              value: /^[a-z0-9]+$/,
              message: "영어 소문자와 숫자만 입력 가능합니다.",
            },
          }}
          error={errors.username?.message}
        />

        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          name="password"
          register={register}
          rules={{
            required: "비밀번호는 필수 입력입니다.",
            validate: validatePasswordComplexity,
          }}
          error={errors.password?.message}
        />

        <InputField
          label="비밀번호 확인"
          placeholder="입력하신 비밀번호를 한 번 더 입력해 주세요."
          type="password"
          name="confirmPassword"
          register={register}
          rules={{
            required: "비밀번호 확인은 필수입니다.",
            validate: (value) =>
              value === passwordValue || "비밀번호가 일치하지 않습니다.",
          }}
          error={errors.confirmPassword?.message}
        />

        <InputField
          label="닉네임"
          placeholder="닉네임을 입력해 주세요."
          name="nickname"
          register={register}
          rules={{
            required: "닉네임은 필수 입력입니다.",
            minLength: { value: 2, message: "닉네임은 2자 이상이어야 합니다." },
          }}
          error={errors.nickname?.message}
        />

        <InputField
          label="이메일"
          placeholder="이메일을 입력해 주세요."
          name="email"
          register={register}
          rules={{
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식을 입력해주세요.",
            },
          }}
          error={errors.email?.message}
        />

        <BirthDateField register={register} errors={errors} />

        <InputField
          label="휴대폰 번호"
          placeholder="휴대폰 번호를 입력해 주세요. (- 제외)"
          name="phone"
          register={register}
          rules={{
            required: "휴대폰 번호는 필수 입력입니다.",
            pattern: {
              value: /^\d{10,11}$/,
              message: "-를 제외한 숫자만 입력해주세요.",
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
          className="w-full h-[52px] bg-[#80caff] text-white text-[20px] font-bold rounded-lg mt-4 mb-36"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
