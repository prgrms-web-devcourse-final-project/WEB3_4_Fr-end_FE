"use client";

import React from "react";

interface SelectFieldProps {
  label: string;
  options: string[];
}

export default function SelectField({ label, options }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-black text-base font-normal mb-1">{label}</label>
      <select className="w-full h-[50px] px-2.5 bg-white rounded outline  outline-customGray-500 text-[13px] text-customGray-400 focus:outline-customBlack-400">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
