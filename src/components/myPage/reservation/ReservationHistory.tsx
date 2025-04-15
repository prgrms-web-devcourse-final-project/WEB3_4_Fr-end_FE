"use client";

import { useEffect, useState } from "react";
import MyReservationPastCard from "./MyReservationPastCard";
import Link from "next/link";
import MyReservationCurrentCard from "./MyReservationCurrentCard";
import api from "@/lib/auth/axios";
import { Booking } from "@/types/myPage/booking";

interface BookingResponse {
  upcoming: Booking[];
  pastOrCanceled: Booking[];
}

export default function ReservationHistory() {
  const [reservationData, setReservationData] = useState<BookingResponse>({
    upcoming: [],
    pastOrCanceled: [],
  });
  const [visiblePastCount, setVisiblePastCount] = useState(3);
  const [visibleCurrentCount, setVisibleCurrentCount] = useState(3);

  const fetchReservation = async () => {
    try {
      const res = await api.get<BookingResponse>("/api/v1/bookings/mypage");
      setReservationData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  const upcoming = reservationData.upcoming;
  const pastOrCanceled = reservationData.pastOrCanceled;

  const visibleCurrentItems = upcoming.slice(0, visibleCurrentCount);
  const visiblePastItems = pastOrCanceled.slice(0, visiblePastCount);
  const hasCurrentMore = visibleCurrentCount < upcoming.length;
  const hasPastMore = visiblePastCount < pastOrCanceled.length;

  const handlePastLoadMore = () => {
    setVisiblePastCount((prev) => prev + 3);
  };

  const handleCurrentLoadMore = () => {
    setVisibleCurrentCount((prev) => prev + 3);
  };

  return (
    <div className="w-[726px] min-h-[763px] flex-col">
      <div className="font-bold text-[28px] font-[pretendard] mb-[21px]">
        내 예약 내역
      </div>
      {upcoming.length === 0 ? (
        <div className="w-[726px] bg-customGray-100 px-[25px] py-[30px] rounded-[4px]">
          <p className="font-semibold text-[16px] font-[pretendard]">
            예정된 여행이 없습니다.
          </p>
          <p className="text-[13px]">지금 새로운 예약을 진행해보세요!</p>
          <Link
            href="/reservation"
            className="w-[112px] h-[30px] rounded-[8px] bg-customBlue-200 text-white font-semibold text-[13px] font-pretendard mt-[7px] px-[15px] py-[3px] hover:bg-customViloet-200"
          >
            여행지 찾아보기
          </Link>
        </div>
      ) : (
        <>
          {visibleCurrentItems.map((item) => (
            <MyReservationCurrentCard
              key={item.bookingId}
              item={item}
              onCancelSuccess={fetchReservation}
            />
          ))}
          {hasCurrentMore && (
            <div
              onClick={handleCurrentLoadMore}
              className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mx-[285px] mb-[20px] hover:bg-customGray-600"
            >
              <div className="text-white text-[13px] font-semibold font-['Pretendard']">
                더보기
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex-col justify-center items-center mt-[20px]">
        <div className="font-bold text-[20px] font-pretendard mb-[17px]">
          이용완료 및 예약 취소
        </div>
        {visiblePastItems.map((item) => (
          <MyReservationPastCard
            key={item.bookingId}
            item={item}
            onDeleteSuccess={fetchReservation}
          />
        ))}
      </div>
      {hasPastMore && (
        <div
          onClick={handlePastLoadMore}
          className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mx-[285px] mb-[113px] hover:bg-customGray-600"
        >
          <div className="text-white text-[13px] font-semibold font-['Pretendard']">
            더보기
          </div>
        </div>
      )}
    </div>
  );
}
