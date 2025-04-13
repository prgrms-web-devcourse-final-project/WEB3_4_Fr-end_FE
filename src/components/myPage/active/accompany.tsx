"use client";

import { useState } from "react";
import AllAcc from "./myAccompany/allAcc";
import MyAcc from "./myAccompany/myAcc";
import YourAcc from "./myAccompany/yourAcc";
import AcceptAcc from "./myAccompany/acceptAcc";
import { MateDummyData } from "@/dummyData/MateDummyData";
import { commentDummyData } from "@/dummyData/CommentDummyData";
import { MatePost } from "@/types/MatePost";

interface AccompanyProps {
  accompanies: MatePost[]; // 타입 명확하면 any 대신 인터페이스로 지정 가능
}

export default function Accompany({ accompanies }: AccompanyProps) {
  const list = [
    "전체",
    "내가 받은 동행신청",
    "내가 신청한 동행신청",
    "동행 수락 목록",
  ];
  const [selectedMenu, setSelectedMenu] = useState<string>("전체");
  const renderContent = () => {
    switch (selectedMenu) {
      case "전체":
        return <AllAcc users={accompanies} comments={commentDummyData} />;
      case "내가 받은 동행신청":
        return <YourAcc users={accompanies} comments={commentDummyData} />;
      case "내가 신청한 동행신청":
        return <MyAcc users={accompanies} comments={commentDummyData} />;
      case "동행 수락 목록":
        return <AcceptAcc users={accompanies} comments={commentDummyData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex font-pretendard font-semibold text-[13px] gap-[20px] hover:text-customGray-500">
        {list.map((menu) => (
          <div
            key={menu}
            onClick={() => setSelectedMenu(menu)}
            className={`cursor-pointer font-normal text-[13px] font-pretendard hover:text-customBlack-400 ${
              selectedMenu === menu
                ? "text-black font-semibold"
                : "text-customGray-500"
            }`}
          >
            {menu}
          </div>
        ))}
      </div>
      <div className="w-[726px]">{renderContent()}</div>
    </div>
  );
}
