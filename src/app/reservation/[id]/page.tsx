"use client";

import Image from "next/image";
import { IoMdShare } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineKingBed } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { LuSquareParking } from "react-icons/lu";
import { PiCookingPotBold } from "react-icons/pi";
import { FiAlertCircle } from "react-icons/fi";
import FloatingReservationBlock from "@/components/reservation/FloatingBlock";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import RoomInfo from "@/components/reservation/RoomInfo";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAccommodationById } from "@/apis/reservation/reservationApi";
import toast from "react-hot-toast";

interface Accommodation {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  availableRooms: number;
  mainImage: string;
  amenities: string[];
  createdAt: string;
  modifiedAt: string;
  mapX: number;
  mapY: number;
  checkInTime: string;
  checkOutTime: string;
}

export default function HouseDetail() {
  const [accommodation, setAccommodation] = useState<Accommodation | null>(
    null
  );
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id; // 배열일 경우 첫 번째 값 사용

  useEffect(() => {
    if (id) {
      fetchAccommodationById(parseInt(id))
        .then((data: Accommodation) => setAccommodation(data))
        .catch((error) => console.error("Failed to fetch data:", error));
    }
  }, [id]);

  if (!accommodation) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {/* 상단 */}
      <div className="flex justify-between items-baseline mt-10">
        <div className="font-bold text-3xl">{accommodation.name}</div>
        <div className="font-medium text-customGray-700">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast("url이 클립보드에 복사되었습니다");
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
            src={accommodation.mainImage || "/reservationImg/testImg.webp"}
            alt="숙소 메인이미지"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-full h-112 rounded-r-2xl overflow-hidden grid grid-cols-2 gap-4">
          <div className="size-full relative">
            <Image
              src={"/reservationImg/subImg1.webp"}
              alt="숙소 서브이미지"
              fill
              objectFit="cover"
            />
          </div>
          <div className="size-full relative">
            <Image
              src={"/reservationImg/subImg2.webp"}
              alt="숙소 서브이미지"
              fill
              objectFit="cover"
            />
          </div>
          <div className="size-full relative">
            <Image
              src={"/reservationImg/subImg3.webp"}
              alt="숙소 서브이미지"
              fill
              objectFit="cover"
            />
          </div>
          <div className="size-full relative">
            <Image
              src={"/reservationImg/subImg4.webp"}
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
          <div className="font-bold text-4xl">{accommodation.name}</div>
          <div className="flex items-center gap-2 mt-2 text-2xl text-customGray-500">
            <CiLocationOn />
            <div>{accommodation.location}</div>
          </div>

          {/* 숙소 소개 */}
          <div className="font-bold text-2xl mt-10">숙소 소개</div>
          <div className="mt-5">
            조용한 휴식과 편안함을 모두 갖춘 공간에서 특별한 하루를 보내보세요.
            <br />
            깔끔한 시설과 아늑한 분위기로 여행의 피로를 잊게 해드립니다.
            <br />
            여유로운 여행을 위한 최적의 숙소, 지금 바로 만나보세요.
          </div>

          {/* 숙소 정보 */}
          <div className="font-bold text-2xl mt-10">숙소 정보</div>
          <div className="grid grid-cols-2 gap-y-4 justify-between mt-5">
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <MdOutlineKingBed />
                <div>객실 수</div>
              </div>
              <div className="font-semibold text-customGray-700">
                {accommodation.availableRooms} 실
              </div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <FaRegClock />
                <div>체크 인</div>
              </div>
              <div className="font-semibold text-customGray-700">
                {accommodation.checkInTime}
              </div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <LuSquareParking />
                <div>주차 가능 여부</div>
              </div>
              <div className="font-semibold text-customGray-700">가능</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="flex gap-3 w-49 font-medium text-customGray-600 items-center">
                <FaRegClock />
                <div>체크 아웃</div>
              </div>
              <div className="font-semibold text-customGray-700">
                익일 {accommodation.checkOutTime}
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
              &nbsp; {accommodation.amenities}
            </div>
          </div>

          {/* 숙소 지도 */}
          <div className="font-bold text-2xl mt-10">숙소 위치</div>
          <div className="text-xl text-customGray-600 mt-5">
            {accommodation.location}
          </div>
          <div className="h-105 w-full rounded-2xl mt-2">
            <Map
              center={{ lat: accommodation.mapY, lng: accommodation.mapX }}
              style={{ width: "100%", height: "100%" }}
              level={1}
            >
              <MapMarker
                position={{
                  lat: accommodation.mapY,
                  lng: accommodation.mapX,
                }}
              />
            </Map>
          </div>

          {/* 객실 정보 */}
          <div className="font-bold text-2xl mt-10">객실 정보</div>
          <RoomInfo
            imageUrl="/reservationImg/Room1.webp"
            roomName="스탠다드 더블"
          />
          <RoomInfo
            imageUrl="/reservationImg/Room2.webp"
            roomName="슈페리얼 트윈"
          />
        </div>

        {/* 우측 예약 블록 */}
        <FloatingReservationBlock
          pricePerNight={accommodation.pricePerNight}
          id={accommodation.id}
        />
      </div>
    </>
  );
}
