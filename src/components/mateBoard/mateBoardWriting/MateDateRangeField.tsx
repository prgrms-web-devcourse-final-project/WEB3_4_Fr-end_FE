"use client";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/mateBoard/mateBoardWriting/DatePickerWithRange";

type MateDateRangeFieldProps = {
  date: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
};

export default function MateDateRangeField({
  date,
  onChange,
}: MateDateRangeFieldProps) {
  return (
    <FormItem className="w-1/2">
      <FormLabel className="text-[20px] font-bold mb-2">여행 날짜</FormLabel>
      <FormControl>
        <DatePickerWithRange
          date={date}
          onChange={onChange}
          className="w-full"
        />
      </FormControl>
    </FormItem>
  );
}
