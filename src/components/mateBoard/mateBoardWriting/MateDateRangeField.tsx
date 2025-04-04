"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DatePickerWithRange } from "@/components/mateBoard/mateBoardWriting/DatePickerWithRange";
import { Control } from "react-hook-form";
import { MateFormType } from "@/lib/mate/mateFormSchema";
import { DateRange } from "react-day-picker";

type MateDateRangeFieldProps = {
  control: Control<MateFormType>;
};

export default function MateDateRangeField({
  control,
}: MateDateRangeFieldProps) {
  return (
    <FormField
      control={control}
      name="dateRange"
      render={({ field }) => (
        <FormItem className="w-1/2">
          <FormLabel className="text-[20px] font-bold mb-2">
            여행 날짜
          </FormLabel>
          <FormControl>
            <DatePickerWithRange
              date={field.value as DateRange}
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
