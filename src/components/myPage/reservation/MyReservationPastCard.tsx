"use client";

import Image from "next/image";
import { Booking } from "@/types/myPage/booking";
import { deleteBooking } from "@/lib/myPage/bookingDelete";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props {
  item: Booking;
  onDeleteSuccess?: () => void;
}

export default function MyReservationCard({ item, onDeleteSuccess }: Props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className="w-[723px] bg-white p-2 border-b border-customGray-300 mb-[15px]">
      <div className="flex mt-2 mb-[15px]">
        <Image
          src={item.accommodationImage}
          alt={item.accommodationName}
          width={120}
          height={120}
          className="rounded-[16px] w-[120px] h-[120px]"
        />
        <div className="ml-4 flex flex-col justify-between w-[589px] max-h-[120px]">
          <div className="flex justify-between items-start mb-[5px]">
            <div className="text-[13px] font-semibold font-pretendard text-customGray-600">
              {item.bookingStatus !== "예약 취소" ? "이용완료" : "예약취소"}
            </div>
            <div
              onClick={() => setShowConfirmModal(true)}
              className="text-[13px] font-semibold text-customBlue-100 cursor-pointer hover:text-customBlue-200"
            >
              예약내역 삭제
            </div>
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
                          setIsDeleting(true);
                          await deleteBooking(item.bookingId);
                          toast.success("예약이 취소되었습니다!");
                          onDeleteSuccess?.();
                          setShowConfirmModal(false);
                        } catch (error: unknown) {
                          if (axios.isAxiosError(error)) {
                            console.error(
                              error.response?.data ||
                                "❌ 예약 취소 api 호출 실패"
                            );
                            toast.error("예약 취소에 실패했습니다!");
                          } else {
                            console.error("❌ 알 수 없는 에러 발생", error);
                            toast.error("알 수 없는 오류가 발생했어요.");
                          }
                        } finally {
                          setIsDeleting(false);
                        }
                      }}
                      className="bg-customBlue-200 text-white px-4 py-2 rounded hover:bg-customViloet-200"
                    >
                      {isDeleting ? "취소 중..." : "네! 삭제할께요!"}
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
          <div>
            <div className="text-[20px] font-semibold text-black font-pretendard mb-[3px]">
              {item.accommodationName}
            </div>
            <div className="text-[13px] text-black mb-[15px]">
              {item.accommodationAddress}
            </div>
          </div>
          <button className="w-[93px] h-[31px] bg-customGray-500 text-white text-[13px] font-semibold rounded-[8px] px-[22px] hover:bg-customBlue-100 cursor-pointer">
            상세 보기
          </button>
        </div>
      </div>
    </div>
  );
}
