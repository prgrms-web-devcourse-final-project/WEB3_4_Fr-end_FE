"use client";

import { useRouter } from "next/navigation";
import { RiCheckboxCircleLine } from "react-icons/ri";

export default function Success() {
  const router = useRouter();

  return (
    <>
      <div className="mt-10 mb-20">
        <div className="w-208 h-134 border border-customGray-300 rounded-sm mx-auto p-6 mt-5">
          <div className="flex flex-col items-center">
            <RiCheckboxCircleLine className="size-15 text-customBlue-100" />
            <div className="text-3xl mt-3">결제가 완료되었습니다.</div>
          </div>
          <div className="flex flex-col gap-6 mt-8 ml-47">
            <div className="font-semibold">
              <div className="text-customBlue-200">결제자</div>
              <div className="text-xl">홍길동</div>
            </div>
            <div className="font-semibold">
              <div className="text-customBlue-200">상품명</div>
              <div className="text-xl">그랜드 하얏트 제주</div>
            </div>
            <div className="font-semibold">
              <div className="text-customBlue-200">결제 수단</div>
              <div className="text-xl">개인 신용</div>
            </div>
            <div className="font-semibold">
              <div className="text-customBlue-200">결제 금액</div>
              <div className="text-xl">100,000 원</div>
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
