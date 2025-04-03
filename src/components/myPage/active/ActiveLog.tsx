import { useState } from "react";
import Accompany from "./accompany";
import Comment from "./comment";
import Post from "./post";
import { dummyTravelPosts } from "@/dummyData/TravelPosts";
import { commentDummyData } from "@/dummyData/CommentDummyData";

export default function ActiveLog() {
  const [selectedMenu, setSelectedMenu] = useState<string>("작성한 게시물");
  const renderContent = () => {
    switch (selectedMenu) {
      case "작성한 게시물":
        return <Post posts={dummyTravelPosts} />;
      case "작성한 댓글":
        return <Comment comments={commentDummyData}/>;
      case "동행 목록":
        return <Accompany />;
      default:
        return null;
    }
  };
  const list = ["작성한 게시물", "작성한 댓글", "동행 목록"];

  return (
    <div className="w-[726px] min-h-[986px] flex-col">
      <div className="font-bold text-[28px] font-[pretendard] mb-[21px]">
        내 활동 내역
      </div>
      <div className="flex gap-[10px]">
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
      <div className="w-[726px] h-[1px] bg-customGray-400 mt-[10px] mb-[20px]" />
      <div className="w-[726px]">{renderContent()}</div>
    </div>
  );
}
