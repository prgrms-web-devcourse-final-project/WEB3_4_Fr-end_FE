"use client";

import Image from "next/image";

export default function Comment() {
  return (
    <div className="w-[726px] outline outline-customGray-400 rounded-[4px] p-[10px]">
      <div className="flex justify-between items-center">
        <div className="text-black text-[24px] font-semibold font-pretendard ml-[4px]">
          6월 말 제주도 동행 구합니다.
        </div>
        <Image
          src="/icons/trashcan.png"
          alt="trashcan"
          width={13}
          height={16.22}
          className="w-[13px] h-[16.22px] mr-[30px]"
        />
      </div>
      <div className="w-[672px] h-[1px] bg-customGray-500 my-[10px] ml-[4px] mr-[30px]" />
      <div className="w-[688px] max-h-[166px]">
        <div className="flex flex-col p-[16px]">
          <Image
            src="/defaultAvatar/31.png"
            alt="Avatar"
            width={32}
            height={32}
            className="w-[32px] h-[32px] rounded-full"
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}
