"use client";

import { fetchAccommodationById } from "@/apis/reservation/reservationApi";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegClock } from "react-icons/fa6";
import { LuUserRound } from "react-icons/lu";

interface Accommodation {
  id: number;
  name: string;
  location: string;
  mainImage: string;
  pricePerNight: number;
  checkInTime: string;
  checkOutTime: string;
}

export default function Payment() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const userName = searchParams.get("userName");
  const userPhone = searchParams.get("userPhone");
  const userId = searchParams.get("userId");
  const people = searchParams.get("people");

  const [paymentMethod, setPaymentMethod] = useState("일반 결제");
  const [couponCode, setCouponCode] = useState(""); // 입력된 쿠폰 코드 상태
  const [discountAmount, setDiscountAmount] = useState(0); // 할인 금액 상태
  const VALID_COUPON = "PLANIT"; // 지정된 쿠폰 코드

  // 숙소 정보 상태
  const [accommodation, setAccommodation] = useState<Accommodation | null>(
    null
  );

  // 쿠폰 적용 함수
  const applyCoupon = () => {
    if (couponCode === VALID_COUPON) {
      setDiscountAmount(10000); // 할인 금액 설정 (10,000원)
      toast("쿠폰이 적용되었습니다!");
    } else {
      setDiscountAmount(0); // 할인 금액 초기화
      toast("유효하지 않은 쿠폰 코드입니다.");
    }
  };

  const ClickChageBtn = () => {
    const { IMP } = window;
    IMP?.init("imp13648461"); // 포트원(아임포트) 가맹점 코드

    // PG 값 설정
    let pg_method = "";
    if (paymentMethod === "일반 결제") {
      pg_method = "html5_inicis"; // 기본 결제 PG
    } else if (paymentMethod === "퀵계좌이체") {
      pg_method = "kakaopay"; // 카카오페이
    } else if (paymentMethod === "간편결제") {
      pg_method = "tosspay"; // 토스페이
    }

    // 총 결제 금액 계산
    const totalAmount = calculateTotalPrice() - discountAmount;

    // 필수 데이터 검증
    if (!userName || !userPhone || !accommodation) {
      toast("결제를 진행하기 위해 필요한 정보가 누락되었습니다.");
      return;
    }
    if (totalAmount <= 0) {
      toast("결제 금액이 0원 이하입니다. 예약 정보를 확인해주세요.");
      return;
    }

    const simplifiedCustomData = {
      userId: Number(userId), // 유저 ID
      accommodationId: accommodation?.id || "", // 숙소 ID
      accommodationName: accommodation.name, // 숙소 이름
      accommodationAddress: accommodation.location, // 숙소 주소
      accommodationImage: accommodation.mainImage, // 숙소 이미지
      checkInDate: checkIn || "", // 체크인 날짜
      checkOutDate: checkOut || "", // 체크아웃 날짜
      checkInTime: accommodation.checkInTime || "", // 체크인 시간
      guestCount: people || "", // 예약 인원 수
      totalPrice: totalAmount, // 총 결제 금액
    };

    IMP?.request_pay(
      {
        pg: pg_method, // 선택된 PG 값
        pay_method: "card", // 결제 방법
        merchant_uid: `mid_${new Date().getTime()}`, // 주문 고유 ID
        name: `${accommodation?.name}`, // 결제 이름
        amount: totalAmount, // 결제 금액
        buyer_name: userName, // 구매자 이름
        buyer_tel: userPhone, // 구매자 전화번호
        buyer_addr: accommodation?.location || "", // 숙소 위치
        buyer_postcode: userId,
        buyer_email: `${accommodation.id}`,
        custom_data: JSON.stringify({
          user_id: Number(userId), // 유저 ID
          accommodation_id: accommodation?.id || "", // 숙소 ID
          accommodation_name: accommodation.name, // 숙소 이름
          accommodation_address: accommodation.location, // 숙소 주소
          accommodation_image: accommodation.mainImage, // 숙소 이미지
          check_in_date: checkIn || "", // 체크인 날짜
          check_out_date: checkOut || "", // 체크아웃 날짜
          check_in_time: accommodation.checkInTime, // 체크인 시간
          guest_count: people || "", // 예약 인원 수
          total_price: totalAmount, // 총 결제 금액
          merchant_uid: `mid_${new Date().getTime()}`, // 주문 고유 ID
          imp_uid: "imp13648461", // 결제 고유 ID (결제가 성공해야 확인 가능)
          booking_status: "예약 완료", // 예약 상태
          payment_method: pg_method, // 결제 방식
          reserved_at: new Date().toISOString(), // 예약 생성 시각
        }),
      },
      async function (rsp) {
        const { buyer_name, name, pg_provider, paid_amount } = rsp;

        const queryParams = new URLSearchParams({
          buyer_name: buyer_name || "",
          name: name || "",
          pg_provider: pg_provider || "",
          paid_amount: paid_amount?.toString() || "",
        });

        if (rsp.success) {
          toast("결제가 완료되었습니다!");
          console.log("결제 성공:", rsp);

          try {
            // 전송할 데이터를 변수로 추출
            const payload = {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
              payMethod: rsp.pay_method,
              pgProvider: rsp.pg_provider,
              pgTid: rsp.pg_tid,
              paidAmount: rsp.paid_amount,
              currency: "KRW",
              status: rsp.status,
              paid_at: rsp.paid_at,
              receiptUrl: rsp.receipt_url,
              custom_data: simplifiedCustomData,
            };

            // 전송할 데이터를 콘솔에 출력
            console.log("API로 보낼 데이터:", payload);

            // API 호출
            const response = await axios.post(
              "http://api.sete.kr:8080/api/v1/bookings/complete",
              payload
            );

            // API 응답 결과 출력
            console.log("API 응답:", response.data);
          } catch (error) {
            console.error("API 호출 중 오류", error);
          }
          router.push(`/reservation/payment/success?${queryParams}`);
        } else {
          router.push("/reservatin/payment/failure");
        }
      }
    );
  };

  // 숙소 정보 불러오기
  useEffect(() => {
    if (id) {
      fetchAccommodationById(parseInt(id))
        .then((data: Accommodation) => setAccommodation(data))
        .catch((error) =>
          console.error("Failed to fetch accommodation:", error)
        );
    }
  }, [id]);

  // 금액 계산 (1박당 가격 설정)
  const pricePerNight = accommodation?.pricePerNight || 100000;

  const calculateTotalNights = () => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const nights = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return nights > 0 ? nights : 0;
    }
    return 0; // 기본값
  };

  const calculateTotalPrice = () => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const nights = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return nights > 0 ? nights * pricePerNight * Number(people || 1) : 0;
    }
    return 0;
  };

  return (
    <>
      <div className="mt-10 mb-20">
        <div className="w-208 h-86 font-semibold border border-customGray-300 rounded-sm mx-auto p-6">
          <div className="text-xl">숙소</div>
          <div className="text-3xl mt-3">{accommodation?.name}</div>
          <div className="grid grid-cols-2 justify-between mt-5">
            <div className="text-customGray-500">체크인</div>
            <div className="text-customGray-500">체크아웃</div>
            <div className="font-bold">{checkIn}</div>
            <div className="font-bold">{checkOut}</div>
            <div className="flex items-center gap-2 text-customGray-700">
              <FaRegClock />
              <div>{accommodation?.checkInTime}</div>
            </div>
            <div className="flex items-center gap-2 text-customGray-700">
              <FaRegClock />
              <div>익일 {accommodation?.checkOutTime}</div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <LuUserRound />
              <div>{people}인</div>
            </div>
          </div>
          <div className="flex flex-col items-end mt-2">
            <div className="flex text-xl items-baseline">
              <div className="text-customGray-700">
                숙박 / {calculateTotalNights()}박&nbsp;
              </div>
              <div className="text-3xl">
                {calculateTotalPrice().toLocaleString()}
              </div>
              <div className="text-customGray-700">&nbsp;원</div>
            </div>
            <div className="font-bold text-xl text-red-600 mt-2">
              취소 및 환불 불가
            </div>
          </div>
        </div>
        <div className="w-208 h-55 font-semibold border border-customGray-300 rounded-sm mx-auto p-6 mt-5">
          <div className="text-xl">이용자 정보</div>
          <div className="text-customGray-600 mt-5">성명</div>
          <div className="text-xl">{userName}</div>
          <div className="text-customGray-600 mt-7">전화번호</div>
          <div className="text-xl">{userPhone}</div>
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
              {calculateTotalPrice().toLocaleString()} 원
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
                {(calculateTotalPrice() - discountAmount).toLocaleString()}
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
              간편 결제 (카카오페이)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="간편결제"
                checked={paymentMethod === "간편결제"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              간편 결제 (토스페이)
            </label>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              className="px-13 py-2 bg-customBlue-100 text-white rounded-sm cursor-pointer"
              onClick={() => ClickChageBtn()}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
