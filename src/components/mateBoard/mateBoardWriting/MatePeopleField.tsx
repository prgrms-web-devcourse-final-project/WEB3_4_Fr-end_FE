"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { MateFormType } from "@/lib/mate/mateFormSchema";

type MatePeopleFieldProps = {
  control: Control<MateFormType>;
};

export default function MatePeopleField({ control }: MatePeopleFieldProps) {
  return (
    <FormField
      control={control}
      name="people"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[20px] font-bold mb-2">
            모집 인원
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              className="w-1/4"
              placeholder="모집 인원"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
