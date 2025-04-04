"use client";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MateGenderSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MateGenderSelect({
  value,
  onChange,
}: MateGenderSelectProps) {
  return (
    <FormItem>
      <FormLabel className="text-[20px] font-bold mb-2">
        메이트 희망 성별
      </FormLabel>
      <FormControl>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="성별을 선택해 주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>성별</SelectLabel>
              <SelectItem value="NO_PREFERENCE">무관</SelectItem>
              <SelectItem value="MALE">남성</SelectItem>
              <SelectItem value="FEMALE">여성</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  );
}
