import { useEffect, useState } from "react";
import Accompany from "./accompany";
import Comment from "./comment";
import Post from "./post";
// import { dummyTravelPosts } from "@/dummyData/TravelPosts";
import { commentDummyData } from "@/dummyData/CommentDummyData";
import api from "@/lib/auth/axios";
import { MatePostResponse } from "@/types/MatePostResponse";

const transformPosts = (apiData: MatePostResponse[]) => {
  return apiData.map((item) => ({
    id: item.matePostId,
    title: item.title,
    place: item.travelRegion,
    startDate: item.travelStartDate,
    endDate: item.travelEndDate,
    img: item.imageUrl,
    city: item.travelRegion,
  }));
};

export default function ActiveLog() {
  const [selectedMenu, setSelectedMenu] = useState<string>("작성한 게시물");
  const [posts, setPosts] = useState<MatePostResponse[]>([]);
  const [comments, setComments] = useState([]);
  const [accompanies, setAccompanies] = useState([]);

  const list = ["작성한 게시물", "작성한 댓글", "동행 목록"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedMenu === "작성한 게시물") {
          const res = await api.get("/api/v1/user/me/activity/mate-post");
          setPosts(res.data);
        } else if (selectedMenu === "작성한 댓글") {
          const res = await api.get("/api/v1/user/me/activity/mate-comments");
          setComments(res.data);
        } else if (selectedMenu === "동행 목록") {
          const res = await api.get("/api/v1/user/me/activity/accompany");
          setAccompanies(res.data);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, [selectedMenu]);

  const renderContent = () => {
    switch (selectedMenu) {
      case "작성한 게시물":
        const transformedPosts = transformPosts(posts);
        return <Post posts={transformedPosts} />;
      case "작성한 댓글":
        return (
          <Comment
            comments={comments.length > 0 ? comments : commentDummyData}
          />
        );
      case "동행 목록":
        return <Accompany accompanies={accompanies} />;
      default:
        return null;
    }
  };

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
