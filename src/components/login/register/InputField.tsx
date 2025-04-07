"use client";

import React from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  error?: string;
  type?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export default function InputField<T extends FieldValues>({
  label,
  placeholder,
  error,
  type = "text",
  name,
  register,
  rules,
}: InputFieldProps<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-black text-base text-[16px] font-normal mb-[5px]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className="w-full h-[50px] px-2.5 py-3.5 bg-white rounded outline outline-customGray-500 text-[13px] text-customGray-400 focus:outline-customBlack-400"
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
