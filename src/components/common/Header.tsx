"use client";

// import Link from "next/link";
import Image from "next/image";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-[1440px] h-[125px] relative bg-white overflow-hidden mx-auto">
      <div className="w-[1256px] px-2.5 inline-flex justify-start items-start gap-[637px]">
        <Image
          src="/logo/blue.png"
          alt="Logo"
          width={103}
          height={42}
          className="w-[103px] h-[42px]"
        />
        <div className="py-2.5 flex justify-start items-center gap-[27px]">
          <div className="w-[364px] h-[31px] px-4 py-[5px] bg-[#f2f2f2] rounded-[30px] outline-1 outline-offset-[-1px] outline-[#202020] flex justify-between items-center">
            <div className="w-[138px] flex justify-between items-end">
              <div className="justify-start text-neutral-600 text-[13px] font-normal font-['Pretendard']">
                어디로 떠나고 싶으신가요?
              </div>
            </div>
            <Image src="/icons/renz.svg" alt="search" width={16} height={16} />
          </div>
          <div className="flex justify-start items-center gap-[27px]">
            <div className="w-5 h-5 relative overflow-hidden">
              <Image src="/icons/cart3.svg" alt="cart" width={20} height={20} />
            </div>
            <div className="w-5 h-5 relative overflow-hidden">
              <Image
                src="/icons/bell3.svg"
                alt="alart"
                width={20}
                height={20}
              />
            </div>
            <div className="w-[21px] h-[21px] relative overflow-hidden">
              <Image src="/icons/user.svg" alt="user" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
