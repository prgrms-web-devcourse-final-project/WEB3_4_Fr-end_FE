"use client";

import { useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { LuUserRound } from "react-icons/lu";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("일반 결제");
  const [couponCode, setCouponCode] = useState(""); // 입력된 쿠폰 코드 상태
  const [discountAmount, setDiscountAmount] = useState(0); // 할인 금액 상태
  const VALID_COUPON = "PLANIT"; // 지정된 쿠폰 코드
  const ORIGINAL_PRICE = 100000; // 원래 금액

  // 결제로직
  const handleSubmit = () => {
    alert(`${paymentMethod}를 선택하셨습니다.`);
  };

  // 쿠폰 적용 함수
  const applyCoupon = () => {
    if (couponCode === VALID_COUPON) {
      setDiscountAmount(10000); // 할인 금액 설정 (10,000원)
      alert("쿠폰이 적용되었습니다!");
    } else {
      setDiscountAmount(0); // 할인 금액 초기화
      alert("유효하지 않은 쿠폰 코드입니다.");
    }
  };

  return (
    <>
      <div className="mt-10 mb-20">
        <div className="w-208 h-86 font-semibold border border-customGray-300 rounded-sm mx-auto p-6">
          <div className="text-xl">숙소</div>
          <div className="text-3xl mt-3">그랜드 하얏트 제주</div>
          <div className="grid grid-cols-2 justify-between mt-5">
            <div className="text-customGray-500">체크인</div>
            <div className="text-customGray-500">체크아웃</div>
            <div className="font-bold">2025.04.03</div>
            <div className="font-bold">2025.04.04</div>
            <div className="flex items-center gap-2 text-customGray-700">
              <FaRegClock />
              <div>15:00</div>
            </div>
            <div className="flex items-center gap-2 text-customGray-700">
              <FaRegClock />
              <div>익일 11:00</div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <LuUserRound />
              <div>2인</div>
            </div>
          </div>
          <div className="flex flex-col items-end mt-2">
            <div className="flex text-xl items-baseline">
              <div className="text-customGray-700">숙박 / 1박&nbsp;</div>
              <div className="text-3xl">{ORIGINAL_PRICE.toLocaleString()}</div>
              <div className="text-customGray-700">&nbsp;원</div>
            </div>
            <div className="font-bold text-xl text-red-600 mt-2">
              취소 및 환불 불가
            </div>
          </div>
        </div>
        <div className="w-208 h-55 font-semibold border border-customGray-300 rounded-sm mx-auto p-6 mt-5">
          <div className="text-xl">예약자 정보</div>
          <div className="text-customGray-600 mt-5">성명</div>
          <div className="text-xl">홍길동</div>
          <div className="text-customGray-600 mt-7">전화번호</div>
          <div className="text-xl">010-1234-5678</div>
        </div>
        <div className="w-208 h-55 font-semibold border border-customGray-300 rounded-sm mx-auto p-6 mt-5">
          <div className="text-xl">할인</div>
          <div className="flex w-full h-11 font-medium text-customGray-600 py-3 px-4 mt-6 bg-customGray-100 rounded-lg justify-between">
            <div>쿠폰 할인</div>
            <div>
              {discountAmount > 0
                ? `- ${discountAmount.toLocaleString()} 원`
                : "적용 가능한 할인 없음"}
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <input
              type="text"
              placeholder="쿠폰 코드를 입력하세요"
              className="flex-1 border border-customGray-300 rounded-sm px-4 py-2"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              onClick={applyCoupon}
              className="px-6 py-2 bg-customBlue-100 text-white rounded-sm"
            >
              적용
            </button>
          </div>
        </div>
        <div className="w-208 h-54 font-semibold border border-customGray-300 rounded-sm mx-auto p-6 mt-5">
          <div className="text-xl">결제 금액</div>
          <div className="flex justify-between mt-5">
            <div className="text-customGray-500">상품 금액</div>
            <div className="text-customGray-700">
              {ORIGINAL_PRICE.toLocaleString()} 원
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-customGray-500">할인 금액</div>
            <div className="text-customGray-700">
              - {discountAmount.toLocaleString()} 원
            </div>
          </div>
          <div className="w-full border border-customGray-300 my-5"></div>
          <div className="flex justify-between text-xl">
            <div>총 금액</div>
            <div className="flex">
              <div className="text-red-600">
                {(ORIGINAL_PRICE - discountAmount).toLocaleString()}
              </div>
              <div>&nbsp;원</div>
            </div>
          </div>
        </div>
        {/* 결제 수단 선택 섹션 */}
        <div className="w-208 h-63 font-semibold border border-customGray-300 rounded-sm mx-auto p-6 mt-5">
          <div className="text-xl mb-4">결제 수단 선택</div>
          <div className="flex flex-col gap-3 text-customGray-700">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="일반 결제"
                checked={paymentMethod === "일반 결제"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              일반 결제 (신용카드, 일반계좌이체, 가상계좌)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="퀵계좌이체"
                checked={paymentMethod === "퀵계좌이체"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              퀵계좌이체
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="간편결제"
                checked={paymentMethod === "간편결제"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              간편결제 (토스이체, 네이버페이, 카카오페이, 페이코, 앱카드결제)
            </label>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              className="px-13 py-2 bg-customBlue-100 text-white rounded-sm"
              onClick={handleSubmit}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
