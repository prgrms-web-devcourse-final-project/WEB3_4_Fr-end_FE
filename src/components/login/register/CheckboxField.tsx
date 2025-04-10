"use client";

import React from "react";

interface CheckboxFieldProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxField({
  label,
  id,
  checked,
  onChange,
}: CheckboxFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 outline-customGray-500"
      />
      <label htmlFor={id} className="text-sm text-black">
        {label}
      </label>
    </div>
  );
}
