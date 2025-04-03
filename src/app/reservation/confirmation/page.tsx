"use client";

import Image from "next/image";
import { IoCall } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import Yaggwan from "@/components/reservation/Yaggwan";
import { useState } from "react";

export default function Confirmation() {
  const [reservationData, setReservationData] = useState({
    name: "",
    phone: "",
  });

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    people: "",
  });

  const handleReservationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationData({ ...reservationData, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="w-full h-100 rounded-2xl relative overflow-hidden mt-10">
        <Image
          src={"/reservationImg/testImg.webp"}
          alt="숙소 이미지"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mt-10 flex gap-30">
        <div className="font-semibold w-66 ml-10">
          <div className="text-xl text-customGray-600">호텔</div>
          <div className="text-3xl mt-2">그랜드 하얏트 제주</div>
        </div>
        <div className="font-medium text-xl text-customGray-600">
          <div className="flex gap-2 items-center">
            <IoCall />
            <div>010-1234-5678</div>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <CiLocationOn />
            <div>제주특별자치도 제주시 노형동</div>
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
              <label className="w-24 text-lg font-medium" htmlFor="name">
                이름
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="이름"
                value={reservationData.name}
                onChange={handleReservationChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
                readOnly
              />
            </div>
            <div className="flex items-center mb-4 ml-10">
              <label className="w-24 text-lg font-medium" htmlFor="phone">
                전화번호
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="전화번호"
                value={reservationData.phone}
                onChange={handleReservationChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
                readOnly
              />
            </div>
          </div>
          {/* 이용자 정보 */}
          <div className="w-full h-full border border-customGray-300 rounded-xl pt-8 pl-9">
            <div className="font-medium text-xl mb-8">이용자 정보</div>
            <div className="flex items-center mb-4 ml-10">
              <label className="w-24 text-lg font-medium" htmlFor="userName">
                이름
              </label>
              <input
                id="userName"
                type="text"
                name="name"
                placeholder="이름"
                value={userData.name}
                onChange={handleUserChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
              />
            </div>
            <div className="flex items-center mb-4 ml-10">
              <label className="w-24 text-lg font-medium" htmlFor="userPhone">
                전화번호
              </label>
              <input
                id="userPhone"
                type="tel"
                name="phone"
                placeholder="전화번호"
                value={userData.phone}
                onChange={handleUserChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
              />
            </div>
            <div className="flex items-center mb-4 ml-10">
              <label className="w-24 text-lg font-medium" htmlFor="people">
                인원
              </label>
              <input
                id="people"
                type="number"
                name="people"
                placeholder="인원"
                value={userData.people}
                onChange={handleUserChange}
                className="w-49 h-8 border border-customGray-500 p-2 rounded"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full border border-customGray-300 rounded-xl pt-8 px-9">
          <div className="font-medium text-xl mb-8">일정 확인</div>
          <div className="h-94 bg-amber-200"></div>
        </div>
      </div>
      <div className="border border-customGray-300 my-10 w-full"></div>
      <div className="w-full h-81 border border-customGray-300 rounded-2xl pt-8 px-9 mb-20">
        <div className="font-medium text-xl mb-8">예약 확정하기</div>
        <div className="w-208 h-39 mx-auto grid grid-cols-2 gap-x-57 gap-y-8">
          <div>예약 숙소 :</div>
          <div>예약자 명 :</div>
          <div>예약 인원 :</div>
          <div>예약자 전화번호 :</div>
          <div>예약 일정 :</div>
          <div>금액 :</div>
        </div>
        <button className="bg-customBlue-100 mt-4 py-3 px-13 rounded-lg mx-auto block">
          결제하기
        </button>
      </div>
    </>
  );
}
