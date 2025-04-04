"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SignupFormData } from "@/types/loginForm";

interface BirthDateFieldProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
}

export default function BirthDateField({
  register,
  errors,
}: BirthDateFieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-black text-base font-normal mb-1">생년월일</label>
      <div className="flex gap-2">
        <div className="flex flex-col w-[196px]">
          <input
            type="text"
            placeholder="YYYY"
            {...register("birthYear", {
              required: "생년을 입력해주세요.",
              pattern: {
                value: /^\d{4}$/,
                message: "4자리 연도를 입력해주세요.",
              },
            })}
            className="w-full h-[50px] px-2.5 py-3.5 bg-white rounded outline  outline-customGray-500 text-[13px] text-customGray-400 focus:outline-customBlack-400"
          />
          {errors.birthYear && (
            <span className="text-red-500 text-sm mt-1">
              {errors.birthYear.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-1/3">
          <input
            type="text"
            placeholder="MM"
            {...register("birthMonth", {
              required: "월을 입력해주세요.",
              pattern: {
                value: /^(0?[1-9]|1[0-2])$/,
                message: "1~12 사이의 숫자를 입력해주세요.",
              },
            })}
            className="w-full h-[50px] px-2.5 py-3.5 bg-white rounded outline  outline-customGray-500 text-[13px] text-customGray-400 focus:outline-customBlack-400"
          />
          {errors.birthMonth && (
            <span className="text-red-500 text-sm mt-1">
              {errors.birthMonth.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-1/3">
          <input
            type="text"
            placeholder="DD"
            {...register("birthDay", {
              required: "일을 입력해주세요.",
              pattern: {
                value: /^(0?[1-9]|[12][0-9]|3[01])$/,
                message: "1~31 사이의 숫자를 입력해주세요.",
              },
            })}
            className="w-full h-[50px] px-2.5 py-3.5 bg-white rounded outline  outline-customGray-500 text-[13px] text-customGray-400 focus:outline-customBlack-400"
          />
          {errors.birthDay && (
            <span className="text-red-500 text-sm mt-1">
              {errors.birthDay.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
