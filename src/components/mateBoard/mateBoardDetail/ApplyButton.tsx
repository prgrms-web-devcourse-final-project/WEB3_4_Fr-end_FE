"use client";

import { postApplication } from "@/apis/mateBoard/postApplication";
import { Button } from "@/components/ui/button";

export default function ApplyButton({ postId }: { postId: number }) {
  const handleApply = async () => {
    try {
      const result = await postApplication(postId);
      console.log(result.data);
      alert("동행 신청을 하였습니다.");
    } catch (error) {
      console.error("동행 신청 오류:", error);
      alert("동행 신청에 실패했습니다.");
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
