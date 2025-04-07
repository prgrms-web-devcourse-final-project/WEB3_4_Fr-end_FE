"use client";

import Image from "next/image";
import { IoMdShare } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineKingBed } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { LuSquareParking } from "react-icons/lu";
import { PiCookingPotBold } from "react-icons/pi";
import { FiAlertCircle } from "react-icons/fi";
import FloatingReservationBlock from "@/components/reservation/FloatingBlock";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import RoomInfo from "@/components/reservation/RoomInfo";

export default function HouseDetail() {
  return (
    <>
      {/* 상단 */}
      <div className="flex justify-between items-baseline mt-10">
        <div className="font-bold text-3xl">그랜드 하얏트 제주</div>
        <div className="flex gap-5 font-medium text-customGray-700">
          <button
            onClick={() => {
              alert("찜하기 버튼");
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            <AiOutlineLike />
            <div>찜하기</div>
          </button>
          <button
            onClick={() => {
              alert("공유 버튼");
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            <IoMdShare />
            <div>공유하기</div>
          </button>
        </div>
      </div>
      {/* 이미지 */}
      <div className="flex gap-4 mt-6">
        <div className="w-full h-112 relative overflow-hidden rounded-l-2xl">
          <Image
            src={"/reservationImg/testImg.webp"}
            alt="숙소 메인이미지"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-full h-112 rounded-r-2xl overflow-hidden grid grid-cols-2 gap-4">
          <div className="size-full relative">
            <Image
              src={"/reservationImg/testImg.webp"}
              alt="숙소 서브이미지"
              fill
              objectFit="cover"
            />
          </div>
          <div className="size-full relative">
            <Image
              src={"/reservationImg/testImg.webp"}
              alt="숙소 서브이미지"
              fill
              objectFit="cover"
            />
          </div>
          <div className="size-full relative">
            <Image
              src={"/reservationImg/testImg.webp"}
              alt="숙소 서브이미지"
              fill
              objectFit="cover"
            />
          </div>
          <div className="size-full relative">
            <Image
              src={"/reservationImg/testImg.webp"}
              alt="숙소 서브이미지"
              fill
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-40 mt-10">
        {/* 좌측 숙소정보섹션 */}
        <div className="col-span-3">
          <div className="font-bold text-4xl">그랜드 하얏트 제주</div>
          <div className="flex items-center gap-2 mt-2 text-2xl text-customGray-500">
            <CiLocationOn />
            <div>제주특별자치도 제주시 노형동</div>
          </div>

          {/* 숙소 소개 */}
          <div className="font-bold text-2xl mt-10">숙소 소개</div>
          <div className="mt-5">
            63빌딩의 1.8배 규모인 연면적 30만 3737m2, 높이 169m(38층)를 자랑하는
            제주 최대 높이, 최대 규모의 랜드마크이다. 제주 고도제한선(55m)보다
            높이 위치한 1,600 올스위트 객실, 월드클래스 셰프들이 포진해 있는
            14개의 글로벌 레스토랑 & 바, 인피니티 풀을 포함한 8층 야외풀데크,
            38층 스카이데크를 비롯해 HAN컬렉션 K패션 쇼핑몰, 2개의 프리미엄
            스파, 8개의 연회장 등 라스베이거스, 싱가포르, 마카오에서나 볼 수
            있는 세계적인 수준의 복합리조트이다. 제주국제공항에서 차량으로
            10분거리(5km)이며 제주의 강남이라고 불리는 신제주 관광 중심지에
            위치하고 있다.
          </div>

          {/* 숙소 정보 */}
          <div className="font-bold text-2xl mt-10">숙소 정보</div>
          <div className="grid grid-cols-2 gap-y-4 justify-between mt-5">
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <MdOutlineKingBed />
                <div>객실 수</div>
              </div>
              <div className="font-semibold text-customGray-700">1600 실</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <FaRegClock />
                <div>체크 인</div>
              </div>
              <div className="font-semibold text-customGray-700">15:00</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <LuSquareParking />
                <div>주차 가능 여부</div>
              </div>
              <div className="font-semibold text-customGray-700">15:00</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <FaRegClock />
                <div>체크 아웃</div>
              </div>
              <div className="font-semibold text-customGray-700">
                익일 11:00
              </div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <PiCookingPotBold />
                <div>조리 가능 여부</div>
              </div>
              <div className="font-semibold text-customGray-700">불가</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <FiAlertCircle />
                <div>문의 및 안내</div>
              </div>
              <div className="font-semibold text-customGray-700">
                010-1234-5678
              </div>
            </div>
          </div>
          <div className="flex text-xl mt-6">
            <div className="font-medium text-customGray-600">부대시설 :</div>
            <div className="font-semibold text-customGray-700">
              &nbsp; 세미나실, 스포츠시설, 사우나실, 뷰티시설
            </div>
          </div>

          {/* 숙소 지도 */}
          <div className="font-bold text-2xl mt-10">숙소 위치</div>
          <div className="text-xl text-customGray-600 mt-5">
            제주특별자치도 제주시 노형동
          </div>
          <div className="h-105 w-full rounded-2xl mt-2">
            <Map
              center={{ lat: 33.4852923931, lng: 126.4814715703 }}
              style={{ width: "100%", height: "100%" }}
              level={3}
            >
              <MapMarker
                position={{
                  lat: 33.4852923931,
                  lng: 126.4814715703,
                }}
              />
            </Map>
          </div>

          {/* 객실 정보 */}
          <div className="font-bold text-2xl mt-10">객실 정보</div>
          <RoomInfo />
          <RoomInfo />
        </div>

        {/* 우측 예약 블록 */}
        <FloatingReservationBlock />
      </div>
    </>
  );
}
