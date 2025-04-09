"use client";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { MateFormType } from "@/lib/mate/mateFormSchema";

type ContentTextareaProps = {
  control: Control<MateFormType>;
};

export default function ContentTextarea({ control }: ContentTextareaProps) {
  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[20px] font-bold mb-2">내용</FormLabel>
          <FormControl>
            <Textarea
              placeholder="내용을 입력해주세요"
              className="h-40"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
