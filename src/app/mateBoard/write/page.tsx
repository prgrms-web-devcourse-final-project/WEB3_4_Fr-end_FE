"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { isBefore, startOfToday } from "date-fns";

import MateTitleField from "@/components/mateBoard/mateBoardWriting/MateTitleField";
import MateRegionField from "@/components/mateBoard/mateBoardWriting/MateRegionField";
import MateDateRangeField from "@/components/mateBoard/mateBoardWriting/MateDateRangeField";
import MatePeopleField from "@/components/mateBoard/mateBoardWriting/MatePeopleField";
import MateGenderSelect from "@/components/mateBoard/mateBoardWriting/MateGenderSelector";
import ImageUpload from "@/components/mateBoard/mateBoardWriting/MateImageUploader";
import ContentTextarea from "@/components/mateBoard/mateBoardWriting/MateContentField";
import { buildMatePayload } from "@/lib/mate/buildMatePayload";

const formSchema = z.object({
  title: z.string().min(5, "제목은 최소 5글자").max(30, "제목은 30글자 이하"),
  dateRange: z
    .object({
      from: z.date({ required_error: "시작 날짜를 선택해주세요" }),
      to: z.date({ required_error: "종료 날짜를 선택해주세요" }),
    })
    .refine((range) => !isBefore(range.from, startOfToday()), {
      message: "오늘 이후 날짜를 선택해주세요",
      path: ["from"],
    }),
  people: z
    .number({ required_error: "모집 인원을 입력해주세요" })
    .min(1, "1명 이상이어야 합니다"),
  content: z.string().min(20, "내용은 최소 20자 이상이어야 합니다."),
});

export default function MateWritingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      dateRange: undefined,
      people: 1,
      content: "",
    },
  });

  const [location, setLocation] = useState("지역 검색");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [people, setPeople] = useState<number>(1);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [mateGender, setMateGender] = useState("NO_PREFERENCE");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = buildMatePayload({
      ...values,
      location,
      dateRange,
      people,
      content,
      images,
      mateGender,
    });

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
    <div>
      <h1 className="font-paperlogy text-center text-[48px] mb-20">
        게시글 작성
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto px-4 py-10 space-y-6"
        >
          <MateTitleField control={form.control} />

          <div className="flex justify-between gap-4">
            <MateRegionField value={location} onChange={setLocation} />
            <MateDateRangeField date={dateRange} onChange={setDateRange} />
          </div>

          <MatePeopleField people={people} onChange={setPeople} />

          <MateGenderSelect value={mateGender} onChange={setMateGender} />

          <ImageUpload images={images} setImages={setImages} />

          <ContentTextarea content={content} setContent={setContent} />

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
    </div>
  );
}
