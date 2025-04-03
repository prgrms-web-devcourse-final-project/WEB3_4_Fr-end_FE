"use client";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction } from "react";

type ContentTextareaProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

export default function ContentTextarea({
  content,
  setContent,
}: ContentTextareaProps) {
  return (
    <FormItem>
      <FormLabel className="text-[20px] font-bold mb-2">내용</FormLabel>
      <FormControl>
        <Textarea
          placeholder="내용을 입력해주세요"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-40"
        />
      </FormControl>
    </FormItem>
  );
}
