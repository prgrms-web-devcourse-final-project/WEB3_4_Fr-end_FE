"use client";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import Dropdown from "@/components/mateBoard/common/Dropdown";

type MateRegionFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MateRegionField({
  value,
  onChange,
}: MateRegionFieldProps) {
  return (
    <FormItem className="w-1/3">
      <FormLabel className="text-[20px] font-bold mb-2">여행지</FormLabel>
      <FormControl>
        <Dropdown value={value} onChange={onChange} className="w-full" />
      </FormControl>
    </FormItem>
  );
}
