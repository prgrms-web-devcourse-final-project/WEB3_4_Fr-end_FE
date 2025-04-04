"use client";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import Dropdown from "@/components/mateBoard/common/Dropdown";
import { Control } from "react-hook-form";
import type { MateFormType } from "@/lib/mate/mateFormSchema";

type MateRegionFieldProps = {
  control: Control<MateFormType>;
};

export default function MateRegionField({ control }: MateRegionFieldProps) {
  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem className="w-1/3">
          <FormLabel className="text-[20px] font-bold mb-2">여행지</FormLabel>
          <FormControl>
            <Dropdown
              value={field.value}
              onChange={field.onChange}
              className="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
