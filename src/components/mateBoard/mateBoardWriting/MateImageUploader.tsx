"use client";

import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type ImageUploadProps = {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
};

export default function ImageUpload({ images, setImages }: ImageUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImages([file]);
  };

  return (
    <FormItem>
      <FormLabel className="text-[20px] font-bold mb-2">첨부 이미지</FormLabel>
      <FormControl>
        <div>
          <Input
            id="content_image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {images[0] && (
            <div className="mt-2">
              <Image
                src={URL.createObjectURL(images[0])}
                width={100}
                height={100}
                alt="첨부 이미지 미리보기"
                className="w-[100px] h-[100px] object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </FormControl>
    </FormItem>
  );
}
