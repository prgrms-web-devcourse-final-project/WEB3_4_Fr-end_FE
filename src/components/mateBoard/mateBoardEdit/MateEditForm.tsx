"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import MateTitleField from "@/components/mateBoard/mateBoardWriting/MateTitleField";
import MateRegionField from "@/components/mateBoard/mateBoardWriting/MateRegionField";
import MateDateRangeField from "@/components/mateBoard/mateBoardWriting/MateDateRangeField";
import MatePeopleField from "@/components/mateBoard/mateBoardWriting/MatePeopleField";
import MateGenderSelect from "@/components/mateBoard/mateBoardWriting/MateGenderSelector";
import ContentTextarea from "@/components/mateBoard/mateBoardWriting/MateContentField";

import { buildMatePayload } from "@/lib/mate/buildMatePayload";
import { mateFormSchema, type MateFormType } from "@/lib/mate/mateFormSchema";
import { putMateBoardPost } from "@/apis/mateBoard/putMateBoardPost";
// 이미지 업로드 함수 (axios를 이용한 구현)
import { uploadImageToServer } from "@/apis/mateBoard/postImage";
import Image from "next/image";

interface MateEditFormData {
  id: number;
  title: string;
  travelStartDate: Date;
  travelEndDate: Date;
  recruitCount: number;
  content: string;
  travelRegion: string;
  mateGender?: string;
  imageUrl?: string;
}

interface MateEditFormProps {
  data: MateEditFormData;
}

export default function MateEditForm({ data }: MateEditFormProps) {
  const router = useRouter();
  const [mateGender, setMateGender] = useState<string>(
    data.mateGender || "NO_PREFERENCE"
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<MateFormType>({
    resolver: zodResolver(mateFormSchema),
    defaultValues: {
      title: data.title,
      dateRange: {
        from: data.travelStartDate,
        to: data.travelEndDate,
      },
      people: data.recruitCount,
      content: data.content,
      location: data.travelRegion,
      mateGender: data.mateGender || "NO_PREFERENCE",
    },
  });

  // 파일 인풋 핸들러: 새 파일 선택 시 상태에 저장
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (values: MateFormType) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let payload = buildMatePayload({
      ...values,
      mateGender,
      images: [],
    });

    // 만약 새 이미지가 선택되었다면, 업로드 후 결과를 payload에 병합
    if (selectedFile) {
      try {
        const uploadResult = await uploadImageToServer(selectedFile);
        payload = {
          ...payload,
          imageId: uploadResult.imageId,
          imageUrl: uploadResult.getUrl,
        };
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("이미지 업로드에 실패했습니다.");
        setIsSubmitting(false);
        return;
      }
    } else if (data.imageUrl) {
      // 새 파일이 선택되지 않았다면 기존 이미지를 그대로 사용
      payload = { ...payload, imageUrl: data.imageUrl };
    }

    try {
      const response = await putMateBoardPost(data.id, payload);
      console.log("수정 완료:", response);
      router.push("/mateBoard");
    } catch (error) {
      console.error("전송 payload:", error);
      console.log("전송 payload:", payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="font-paperlogy text-center text-[48px] mb-20">
        게시글 수정
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
          {/* 이미지 업로드 및 미리보기 영역 */}
          <div className="space-y-2">
            {/* 기존 이미지 미리보기: 새 파일이 선택되지 않은 경우 */}
            {!selectedFile && data.imageUrl && (
              <div>
                <p>현재 이미지:</p>
                <Image
                  src={data.imageUrl}
                  alt="현재 이미지"
                  width={250}
                  height={250}
                  className="rounded-xl"
                />
              </div>
            )}
            {/* 새 이미지 미리보기: 파일이 선택된 경우 */}
            {selectedFile && (
              <div>
                <p>새 이미지 미리보기:</p>
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="새 이미지 미리보기"
                  width={250}
                  height={250}
                  className="rounded-xl"
                />
              </div>
            )}
            <input type="file" id="fileInput" onChange={handleFileChange} />
          </div>
          <ContentTextarea control={form.control} />
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-white bg-black hover:bg-gray-800"
            >
              {isSubmitting ? "수정 중..." : "수정하기"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
