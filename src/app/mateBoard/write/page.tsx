"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/mateBoard/common/Dropdown";
import { DatePickerWithRange } from "@/components/mateBoard/mateBoardWriting/DatePickerWithRange";
import { DateRange } from "react-day-picker";
import { z } from "zod";
import MateWritingForm from "@/components/mateBoard/mateBoardWriting/BoardForm";

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

export default function MateWritePage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("지역 검색");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [people, setPeople] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = () => {
    // post logic 여기에
    console.log({ title, location, dateRange, people, content, images });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-4 py-10 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">게시글 작성</h1>

        {/* 제목 */}
        <Input
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 여행지 & 날짜 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <Dropdown
              value={location}
              className="w-40"
              onChange={setLocation}
            />
          </div>
          <DatePickerWithRange date={dateRange} onChange={setDateRange} />
        </div>

        {/* 모집 인원 */}
        <Input
          type="number"
          placeholder="모집 인원"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />

        {/* 이미지 업로드 (기본 UI) */}
        <div className="space-y-2">
          <p className="text-sm font-medium">첨부사진</p>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files ?? []))}
          />
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="w-[100px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center text-xs"
              >
                {img.name}
              </div>
            ))}
          </div>
        </div>

        {/* 내용 */}
        <Textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-40"
        />

        {/* 제출 버튼 */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            className="px-6 py-2 text-white bg-black hover:bg-gray-800"
          >
            작성하기
          </Button>
        </div>
      </form>
      <MateWritingForm />
    </>
  );
}
