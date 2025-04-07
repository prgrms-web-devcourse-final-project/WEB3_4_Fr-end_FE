import Image from "next/image";

export default function RoomInfo() {
  return (
    <>
      <div className="mt-5 flex gap-8 items-center mb-20">
        <div className="size-[302px] relative overflow-hidden rounded-2xl flex-shrink-0">
          <Image
            src={"/reservationImg/testImg.webp"}
            alt="객실 이미지"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-full">
          <div className="font-semibold text-3xl">130m² 그랜드 스위트 트윈</div>
          <div className="text-customGray-600 mt-2 mb-3 h-12 border-b border-customGray-400">
            ※ 객실 가격 전화문의 요망
          </div>
          <div className="grid grid-cols-2 gap-y-3 justify-between">
            <div className="flex gap-4 text-xl">
              <div className="w-19 font-medium text-customGray-600">
                객실 크기
              </div>
              <div className="font-semibold text-customGray-700">39</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="w-19 font-medium text-customGray-600">
                기준 인원
              </div>
              <div className="font-semibold text-customGray-700">2</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="w-19 font-medium text-customGray-600">
                객실 수
              </div>
              <div className="font-semibold text-customGray-700">15</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="w-19 font-medium text-customGray-600">욕조</div>
              <div className="font-semibold text-customGray-700">Y</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="w-19 font-medium text-customGray-600">TV</div>
              <div className="font-semibold text-customGray-700">Y</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="w-19 font-medium text-customGray-600">인터넷</div>
              <div className="font-semibold text-customGray-700">Y</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="w-19 font-medium text-customGray-600">냉장고</div>
              <div className="font-semibold text-customGray-700">Y</div>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="w-19 font-medium text-customGray-600">
                드라이기
              </div>
              <div className="font-semibold text-customGray-700">Y</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
