"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

type MateTitleFieldProps = {
  control: Control<{ title: string }>;
};

export default function MateTitleField({ control }: MateTitleFieldProps) {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[20px] font-bold mb-2">제목</FormLabel>
          <FormControl>
            <Input {...field} placeholder="제목을 입력해주세요" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
