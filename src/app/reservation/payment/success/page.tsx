"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RiCheckboxCircleLine } from "react-icons/ri";

export default function Success() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const buyer_name = searchParams.get("buyer_name");
  const name = searchParams.get("name");
  const pg_provider = searchParams.get("pg_provider");
  const paid_amount = searchParams.get("paid_amount");

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
              <div className="text-xl">{buyer_name}</div>
            </div>
            <div className="font-semibold">
              <div className="text-customBlue-200">상품명</div>
              <div className="text-xl">{name}</div>
            </div>
            <div className="font-semibold">
              <div className="text-customBlue-200">결제 수단</div>
              <div className="text-xl">{pg_provider}</div>
            </div>
            <div className="font-semibold">
              <div className="text-customBlue-200">결제 금액</div>
              <div className="text-xl">{paid_amount} 원</div>
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
