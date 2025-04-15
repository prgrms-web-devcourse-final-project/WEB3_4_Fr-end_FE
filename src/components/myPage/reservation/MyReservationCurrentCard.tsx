"use client";

import Image from "next/image";
import { Booking } from "@/types/myPage/booking"; // 경로는 프로젝트 구조에 따라
import { useState } from "react";
import { cancelBooking } from "@/lib/myPage/bookingCancel";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  item: Booking;
  onCancelSuccess?: () => void;
}

export default function MyReservationCurrentCard({
  item,
  onCancelSuccess,
}: Props) {
  const [imgSrc, setImgSrc] = useState(item.accommodationImage);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const date = new Date(item.checkInDate);
  const formattedDate = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekDays[date.getDay()];
  return (
    <div className="w-[726px] bg-customGray-100 rounded-2xl mb-[15px] p-[10px]">
      <div className="text-[28px] font-bold font-pretendard ml-[9px] mb-[15px]">
        {formattedDate}({dayOfWeek})
      </div>
      <div className="flex gap-[15px] items-start">
        <Image
          src={imgSrc}
          alt={item.accommodationName}
          width={120}
          height={120}
          className="rounded-[16px] w-[120px] h-[120px]"
          onError={() => {
            setImgSrc("/myReservation/apartment-406901_1280.jpg");
          }}
          priority={true}
        />
        <div className="flex flex-col justify-between h-[120px]">
          <div className="mb-[15px]">
            <div className="text-[16px] font-normal font-pretendard text-black mb-[2px]">
              {formattedDate}({dayOfWeek}) {item.checkInTime}
            </div>
            <div className="text-[20px] font-semibold text-black font-pretendard mb-[3px]">
              {item.accommodationName}
            </div>
            <div className="text-[13px] font-normal font-pretendard text-black">
              {item.accommodationAddress}
            </div>
          </div>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-[93px] h-[31px] bg-customGray-600 text-white text-[13px] font-semibold rounded-[8px] px-[22px] hover:bg-customBlue-100 cursor-pointer"
          >
            예약 취소
          </button>
          {showConfirmModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[400px] shadow-2xl outline-customGray-500">
                <p className="text-center text-[16px] font-semibold mb-4">
                  정말 예약을 취소하시겠습니까?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={async () => {
                      try {
                        setIsCancelling(true);
                        await cancelBooking(item.bookingId);
                        toast.success("예약이 취소되었습니다!");
                        onCancelSuccess?.();
                        setShowConfirmModal(false);
                      } catch (error: unknown) {
                        if (axios.isAxiosError(error)) {
                          console.error(
                            error.response?.data || "❌ 예약 취소 api 호출 실패"
                          );
                          toast.error("예약 취소에 실패했습니다!");
                        } else {
                          console.error("❌ 알 수 없는 에러 발생", error);
                          toast.error("알 수 없는 오류가 발생했어요.");
                        }
                      } finally {
                        setIsCancelling(false);
                      }
                    }}
                    className="bg-customBlue-200 text-white px-4 py-2 rounded hover:bg-customViloet-200"
                  >
                    {isCancelling ? "취소 중..." : "네! 삭제할께요!"}
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    아니오! 남겨주세요!
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
