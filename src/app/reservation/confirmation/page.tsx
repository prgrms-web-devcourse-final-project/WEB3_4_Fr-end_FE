"use client";

import Image from "next/image";
import { IoCall } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import Yaggwan from "@/components/reservation/Yaggwan";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ko } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchAccommodationById } from "@/apis/reservation/reservationApi";

interface Accommodation {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  mainImage: string;
}

export default function Confirmation() {
  // URL에서 데이터 읽기
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const router = useRouter();

  const storedUserData = localStorage.getItem("UserData");
  const parsedUserData = JSON.parse(storedUserData || "");

  // 숙소 정보 상태
  const [accommodation, setAccommodation] = useState<Accommodation | null>(
    null
  );

  const [userData, setUserData] = useState({
    reserverName: parsedUserData.nickname, // 예약자 이름
    reserverPhone: parsedUserData.email, // 예약자 이메일
    userName: "", // 이용자 이름
    userPhone: "", // 이용자 전화번호
    people: "", // 인원
  });

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

  const calculateTotalPrice = () => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const nights = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return nights > 0
        ? nights * pricePerNight * Number(userData.people || 1)
        : 0;
    }
    return 0;
  };

  // 입력 상태 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // 유효성 검사
  const validateUserData = () => {
    if (
      !userData.reserverName ||
      !userData.reserverPhone ||
      !userData.userName ||
      !userData.userPhone ||
      !userData.people
    ) {
      alert("모든 필수 정보를 입력해주세요!");
      return false;
    }
    if (parseInt(userData.people, 10) <= 0) {
      alert("인원은 1명 이상이어야 합니다.");
      return false;
    }
    return true;
  };

  // FullCalendar 이벤트 데이터
  const eventDate = [
    {
      title: "투숙 일정",
      start: checkIn || undefined,
      end: checkOut || undefined,
      backgroundColor: "#80caff",
      borderColor: "#80caff",
    },
  ];

  // 예약 확인 처리
  const handleConfirmReservation = () => {
    if (validateUserData()) {
      const query = new URLSearchParams({
        id: accommodation?.id?.toString() || "", // 숙소 ID
        userName: userData.userName, // 이용자 이름
        userPhone: userData.userPhone, // 이용자 전화번호
        userId: parsedUserData.id, // 유저 id
        people: userData.people, // 예약 인원
        checkIn: checkIn || "", // 예약 시작일
        checkOut: checkOut || "", // 예약 종료일
      }).toString();
      router.push(`/reservation/payment?${query}`);
    }
  };

  return (
    <>
      <div className="w-full h-100 rounded-2xl relative overflow-hidden mt-10">
        <Image
          src={accommodation?.mainImage || "/reservationImg/testImg.webp"}
          alt="숙소 이미지"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mt-10 flex gap-30">
        <div className="font-semibold w-66 ml-10">
          <div className="text-xl text-customGray-600">호텔</div>
          <div className="text-3xl mt-2">{accommodation?.name}</div>
        </div>
        <div className="font-medium text-xl text-customGray-600">
          <div className="flex gap-2 items-center">
            <IoCall />
            <div>010-1234-5678</div>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <CiLocationOn />
            <div>{accommodation?.location}</div>
          </div>
        </div>
      </div>
      <Yaggwan />
      <div className="w-full h-124 mt-10 flex justify-between gap-4">
        <div className="w-full h-full grid grid-rows-2 gap-5">
          {/* 예약자 정보 */}
          <div className="w-full h-full border border-customGray-300 rounded-xl pt-8 pl-9">
            <div className="font-medium text-xl mb-8">예약자 정보</div>
            <div className="flex items-center mb-4 ml-10">
              <label
                className="w-32 text-lg font-medium"
                htmlFor="reserverName"
              >
                예약자 닉네임
              </label>
              <input
                id="reserverName"
                type="text"
                name="reserverName"
                placeholder="예약자 이름"
                value={userData.reserverName}
                onChange={handleInputChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
                readOnly
              />
            </div>
            <div className="flex items-center mb-4 ml-10">
              <label
                className="w-32 text-lg font-medium"
                htmlFor="reserverPhone"
              >
                예약자 이메일
              </label>
              <input
                id="reserverPhone"
                type="tel"
                name="reserverPhone"
                placeholder="예약자 전화번호"
                value={userData.reserverPhone}
                onChange={handleInputChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
                readOnly
              />
            </div>
          </div>
          {/* 이용자 정보 */}
          <div className="w-full h-full border border-customGray-300 rounded-xl pt-8 pl-9">
            <div className="font-medium text-xl mb-8">이용자 정보</div>
            <div className="flex items-center mb-4 ml-10">
              <label className="w-32 text-lg font-medium" htmlFor="userName">
                이용자 이름
              </label>
              <input
                id="userName"
                type="text"
                name="userName"
                placeholder="이용자 이름"
                value={userData.userName}
                onChange={handleInputChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
              />
            </div>
            <div className="flex items-center mb-4 ml-10">
              <label className="w-32 text-lg font-medium" htmlFor="userPhone">
                이용자 전화번호
              </label>
              <input
                id="userPhone"
                type="tel"
                name="userPhone"
                placeholder="이용자 전화번호"
                value={userData.userPhone}
                onChange={handleInputChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
              />
            </div>
            <div className="flex items-center mb-4 ml-10">
              <label className="w-32 text-lg font-medium" htmlFor="people">
                인원
              </label>
              <input
                id="people"
                type="number"
                name="people"
                placeholder="인원"
                value={userData.people}
                onChange={handleInputChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full border border-customGray-300 rounded-xl pt-8 px-9">
          <div className="font-medium text-xl mb-4">일정 확인</div>
          <div className="w-full h-94 mx-auto overflow-hidden">
            <FullCalendar
              initialView="dayGridMonth"
              plugins={[dayGridPlugin]}
              stickyHeaderDates={true}
              aspectRatio={2}
              contentHeight="376px"
              locale={ko}
              headerToolbar={{
                left: "",
                center: "",
                right: "",
              }}
              events={eventDate}
            />
          </div>
        </div>
      </div>
      <div className="border border-customGray-300 my-10 w-full"></div>
      <div className="w-full h-81 border border-customGray-300 rounded-2xl pt-8 px-9 mb-20">
        <div className="font-medium text-xl mb-8">예약 확정하기</div>
        <div className="w-208 h-39 mx-auto grid grid-cols-2 gap-x-57 gap-y-2">
          <div>예약 숙소 : {accommodation?.name} </div>
          <div>이용자 명 : {userData.userName}</div>
          <div>예약 인원 : {userData.people}</div>
          <div>이용자 전화번호 : {userData.userPhone}</div>
          <div>
            예약 일정 : {checkIn} ~ {checkOut}
          </div>
          <div>금액 : {calculateTotalPrice().toLocaleString()}원</div>
        </div>
        <button
          onClick={handleConfirmReservation}
          className="bg-customBlue-100 text-white mt-1 py-3 px-13 rounded-lg mx-auto block"
        >
          결제하기
        </button>
      </div>
    </>
  );
}
