"use client";

import { postApplication } from "@/apis/mateBoard/postApplication";
import { Button } from "@/components/ui/button";
import { PostApplicationResponse } from "@/types/mateBoard/PostApplicationResponse";
import toast from "react-hot-toast";

export default function ApplyButton({ postId }: { postId: number }) {
  const handleApply = async () => {
    try {
      const result = (await postApplication(postId)) as PostApplicationResponse;
      console.log(result);
      if (result.status === 201) {
        toast.success("동행신청을 완료하였습니다.");
      }
    } catch (error) {
      console.log(error);
      toast.error("이미 신청한 게시글입니다.");
    }
  };
  return (
    <Button
      type="submit"
      onClick={handleApply}
      className="p-5 w-30 text-[16px] cursor-pointer hover:bg-customGray-700 focus:outline-2 "
    >
      동행 신청
    </Button>
  );
}
