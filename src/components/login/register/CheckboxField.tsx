"use client";

import React from "react";

interface CheckboxFieldProps {
  label: string;
  id: string;
}

export default function CheckboxField({ label, id }: CheckboxFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="w-4 h-4  outline-customGray-500 text-[13px] text-customGray-400"
      />
      <label htmlFor={id} className="text-sm text-black">
        {label}
      </label>
    </div>
  );
}
