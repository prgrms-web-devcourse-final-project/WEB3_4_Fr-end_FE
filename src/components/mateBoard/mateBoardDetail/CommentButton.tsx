"use client";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { FormEvent } from "react";

export default function CommentButton() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("댓글 전송완료");
  };

  return (
    <div className="">
      <div className="space-y-3">
        {/* 제목 */}
        <h3 className="text-[20px] font-semibold text-gray-800">댓글</h3>

        {/* 입력창 박스 */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border border-customGray-700 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="댓글을 작성해 주세요."
              className="flex-1 bg-transparent outline-none text-sm text-customGray-700 placeholder:text-gray-400"
            />
            <button type="submit" className="text-gray-500 hover:text-gray-800">
              <PaperPlaneIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
