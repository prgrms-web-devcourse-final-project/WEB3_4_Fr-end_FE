"use client";

import { postApplication } from "@/apis/mateBoard/postApplication";
import { Button } from "@/components/ui/button";
import { PostApplicationResponse } from "@/types/mateBoard/PostApplicationResponse";
import { MateDetailData } from "@/types/mateBoard/MateDetailData";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ApplyButton({ data }: { data: MateDetailData }) {
  const userId = useAuthStore((state) => state.user?.id);
  const authorId = data.authorId;
  const isAuthor = userId === authorId;
  const handleApply = async () => {
    try {
      const result = (await postApplication(
        data.matePostId
      )) as PostApplicationResponse;
      console.log(result);
      if (result.status === 201) {
        toast.success("동행신청을 완료하였습니다.");
      }
    } catch (error) {
      console.log(error);
      toast.error("이미 신청한 게시글입니다.");
    }
  };

  if (isAuthor) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                type="submit"
                onClick={handleApply}
                disabled={isAuthor}
                className="p-5 w-30 text-[16px] cursor-pointer hover:bg-customGray-700 focus:outline-2"
              >
                동행 신청
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>자신의 글에는 동행 신청을 할 수 없습니다.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      type="submit"
      onClick={handleApply}
      className="p-5 w-30 text-[16px] cursor-pointer hover:bg-customGray-700 focus:outline-2"
    >
      동행 신청
    </Button>
  );
}
