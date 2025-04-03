"use client";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type MatePeopleFieldProps = {
  people: number;
  onChange: (value: number) => void;
};

export default function MatePeopleField({
  people,
  onChange,
}: MatePeopleFieldProps) {
  return (
    <FormItem>
      <FormLabel className="text-[20px] font-bold mb-2">모집 인원</FormLabel>
      <FormControl>
        <Input
          type="number"
          name="people"
          className="w-1/4"
          placeholder="모집 인원"
          value={people}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </FormControl>
    </FormItem>
  );
}
