"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import MateTitleField from "@/components/mateBoard/mateBoardWriting/MateTitleField";
import MateRegionField from "@/components/mateBoard/mateBoardWriting/MateRegionField";
import MateDateRangeField from "@/components/mateBoard/mateBoardWriting/MateDateRangeField";
import MatePeopleField from "@/components/mateBoard/mateBoardWriting/MatePeopleField";
import MateGenderSelect from "@/components/mateBoard/mateBoardWriting/MateGenderSelector";
import ImageUpload from "@/components/mateBoard/mateBoardWriting/MateImageUploader";
import ContentTextarea from "@/components/mateBoard/mateBoardWriting/MateContentField";
import { buildMatePayload } from "@/lib/mate/buildMatePayload";
import { mateFormSchema, type MateFormType } from "@/lib/mate/mateFormSchema";
import { postMateWriting } from "@/apis/mateBoard/postMateWriting";
import { useRouter } from "next/navigation";
export default function MateWritingForm() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [mateGender, setMateGender] = useState<string>("NO_PREFERENCE");

  const form = useForm<MateFormType>({
    resolver: zodResolver(mateFormSchema),
    defaultValues: {
      title: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
      people: 1,
      content: "",
      location: "지역 검색",
      mateGender: "무관",
    },
  });

  const onSubmit = async (values: MateFormType) => {
    const payload = buildMatePayload({
      ...values,
      mateGender,
      images,
    });

    try {
      const response = await postMateWriting(payload);
      console.log("작성 완료:", response);
      router.push("/mateBoard");
    } catch (error) {
      console.log("전송 payload:", error);
      console.log("전송 payload:", payload);
    }
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
            <MateRegionField control={form.control} />
            <MateDateRangeField control={form.control} />
          </div>

          <MatePeopleField control={form.control} />

          <MateGenderSelect value={mateGender} onChange={setMateGender} />

          <ImageUpload images={images} setImages={setImages} />

          <ContentTextarea control={form.control} />

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
