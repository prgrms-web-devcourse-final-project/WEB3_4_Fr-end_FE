"use client";

import { useRouter } from "next/navigation";
import { GrStatusWarning } from "react-icons/gr";

export default function Failure() {
  const router = useRouter();

  return (
    <>
      <div className="mt-10 mb-20">
        <div className="w-208 h-134 border border-customGray-300 rounded-sm mx-auto p-6 mt-5">
          <div className="flex flex-col items-center">
            <GrStatusWarning className="size-15 text-red-600" />
            <div className="text-3xl mt-3">결제가 실패하였습니다.</div>
          </div>
          <div className="flex flex-col gap-6 mt-8 ml-47">
            <div className="font-semibold">
              <div className="text-customBlue-200">결제사</div>
              <div className="text-xl">PLANIT</div>
            </div>
            <div className="font-semibold">
              <div className="text-customBlue-200">관련 문의</div>
              <div className="text-xl">02-123-4567</div>
            </div>
            <div className="font-semibold">
              <div className="text-customBlue-200">결제 수단</div>
              <div className="text-xl">간편 결제</div>
            </div>
            <div className="font-semibold">
              <div className="text-customBlue-200">실패 사유</div>
              <div className="text-xl">결제 실패</div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              className="px-13 py-2 bg-customBlue-100 text-white rounded-sm cursor-pointer"
              onClick={() => router.push("/")}
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
