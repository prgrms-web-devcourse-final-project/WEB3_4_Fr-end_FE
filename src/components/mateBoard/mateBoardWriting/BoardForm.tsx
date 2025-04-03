"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/mateBoard/mateBoardWriting/DatePickerWithRange";
import Dropdown from "@/components/mateBoard/common/Dropdown";

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "제목은 최소 5글자 이상이어야 합니다.",
    })
    .max(30, {
      message: "제목이 30글자를 넘어갈 수 없습니다.",
    }),
});

export default function MateWritingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const [location, setLocation] = useState("지역 검색");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [people, setPeople] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({
      ...values,
      location,
      dateRange,
      people,
      content,
      images,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto px-4 py-10 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">게시글 작성</h1>

        {/* 제목 */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">제목</FormLabel>
              <FormControl>
                <Input {...field} placeholder="제목을 입력해주세요" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 여행지 & 날짜 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium mb-1">여행지</p>
            <Dropdown
              value={location}
              onChange={setLocation}
              className="w-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">여행 날짜</p>
            <DatePickerWithRange date={dateRange} onChange={setDateRange} />
          </div>
        </div>

        {/* 모집 인원 */}
        <div>
          <p className="text-sm font-medium mb-1">모집 인원</p>
          <Input
            type="number"
            placeholder="모집 인원"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>

        {/* 이미지 업로드 */}
        <div className="space-y-2">
          <p className="text-sm font-medium">첨부 이미지</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImages([file]);
            }}
          />
          {images[0] && (
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center text-xs">
              {images[0].name}
            </div>
          )}
        </div>

        {/* 내용 */}
        <div>
          <p className="text-sm font-medium mb-1">내용</p>
          <Textarea
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-40"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="text-center">
          <Button
            type="submit"
            className="px-6 py-2 text-white bg-black hover:bg-gray-800"
          >
            작성하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
