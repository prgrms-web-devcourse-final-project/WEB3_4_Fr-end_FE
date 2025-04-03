import React, { useState } from "react";

export default function FloatingReservationBlock() {
  const [checkIn, setCheckIn] = useState<string>(""); // 체크인 날짜 상태
  const [checkOut, setCheckOut] = useState<string>(""); // 체크아웃 날짜 상태
  const [totalNights, setTotalNights] = useState<number>(0); // 숙박 기간 상태
  const pricePerNight: number = 100000; // 1박당 가격

  const calculateNights = (start: string, end: string): void => {
    if (start && end) {
      const startDate: Date = new Date(start);
      const endDate: Date = new Date(end);
      const diffTime: number = Math.abs(
        endDate.getTime() - startDate.getTime()
      );
      const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 밀리초를 일 단위로 변환
      setTotalNights(diffDays);
    } else {
      setTotalNights(0);
    }
  };

  const handleReservation = (): void => {
    if (checkIn && checkOut) {
      alert(`체크인 날짜: ${checkIn}\n체크아웃 날짜: ${checkOut}`);
    } else {
      alert("체크인 및 체크아웃 날짜를 선택해주세요.");
    }
  };

  return (
    <section className="col-span-2">
      <div className="sticky top-10 bg-customGray-100 shadow-lg rounded-md p-8">
        <div className="text-3xl font-bold">
          플래닛으로 <br />
          숙소 예약하기
        </div>

        <div className="font-medium text-xl mt-5">체크인</div>
        <input
          type="date"
          className="mt-2 w-full border border-customGray-500 rounded-md p-2 text-customGray-700"
          placeholder="날짜를 선택해주세요"
          value={checkIn}
          onChange={(e) => {
            setCheckIn(e.target.value);
            calculateNights(e.target.value, checkOut); // 숙박 기간 재계산
          }}
        />

        <div className="font-medium text-xl mt-3">체크아웃</div>
        <input
          type="date"
          className="mt-2 w-full border border-customGray-500 rounded-md p-2 text-customGray-700"
          placeholder="날짜를 선택해주세요"
          value={checkOut}
          onChange={(e) => {
            setCheckOut(e.target.value);
            calculateNights(checkIn, e.target.value);
          }}
        />

        <div className="flex mt-7 font-semibold text-xl text-customGray-600 items-baseline justify-end">
          <div>숙박 / {totalNights}박</div>
          <div className="text-3xl text-amber-500">
            &nbsp;{(pricePerNight * totalNights).toLocaleString()}&nbsp;
          </div>
          <div>원</div>
        </div>

        <button
          onClick={handleReservation}
          className="mt-7 w-full bg-customBlue-100 text-white py-3 rounded-lg"
        >
          예약하기
        </button>
      </div>
    </section>
  );
}
