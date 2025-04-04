"use client";

import React from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/login/register/InputField";
import BirthDateField from "@/components/login/register/BirthDateField";
import CheckboxField from "@/components/login/register/CheckboxField";
import SelectField from "@/components/login/register/SelectField";
import { SignupFormData } from "@/types/loginForm";

export default function StyledSignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ mode: "onChange" });

  const onSubmit = (data: SignupFormData) => {
    console.log("회원가입 데이터:", data);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[420px] mx-auto flex flex-col gap-4"
      >
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
          placeholder="휴대폰 번호를 입력해 주세요.(-제외)"
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
        <SelectField label="성별" options={["성별", "남자", "여자"]} />
        <CheckboxField
          id="email-agree"
          label="이메일 메일링 서비스에 동의합니다."
        />
        <button
          type="submit"
          className="w-full h-[52px] bg-[#80caff] text-white text-[20px] font-bold rounded-lg mt-4 mb-[317px]"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
