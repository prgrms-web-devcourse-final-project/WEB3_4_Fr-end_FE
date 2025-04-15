"use client";

import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { convertRegionToKorean } from "@/lib/myPage/covertRegion";
import { useRouter } from "next/navigation";

interface TravelPost {
  id: number;
  title: string;
  place: string;
  startDate: string;
  endDate: string;
  img: string;
  city: string;
}

interface PostProps {
  posts: TravelPost[];
}

export default function Post({ posts }: PostProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;
  const router = useRouter();
  console.log(posts);

  const currentPosts = posts.slice(0, currentPage * postsPerPage);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-sm text-gray-500 mt-4">
          작성한 게시글이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-[15px]">
        {currentPosts.map((post) => {
          const start = dayjs(post.startDate);
          const end = dayjs(post.endDate);
          const duration = end.diff(start, "day") + 1;
          const formatted = `${start.format("YY.MM.DD")} - ${end.format(
            "YY.MM.DD"
          )} (${duration}일)`;

          return (
            <div
              key={post.id}
              onClick={() => router.push(`/mateBoard/detail/${post.id}`)}
              className="w-[210px] min-h-[260px] bg-white outline outline-customGray-400 rounded-[16px] flex-col cursor-pointer"
            >
              <Image
                src={
                  post.img
                    ? post.img
                    : "/myReservation/apartment-406901_1280.jpg"
                }
                alt={post.title}
                width={210}
                height={181}
                className="rounded-t-[16px] w-[210px] h-[181px] mb-[5px] object-cover"
              />
              <div className="px-[20px] pb-[20px] flex-col justify-start items-start gap-[5px]">
                <div className="font-bold text-[13px] font-pretendard text-customGray-700">
                  {convertRegionToKorean(post.city)}
                </div>
                <div className="font-semibold text-black text-[16px] truncate w-full">
                  {post.title}
                </div>
                <div className="flex items-center">
                  <Image
                    src="/icons/Vector.png"
                    alt="Calendar"
                    width={13}
                    height={13}
                    className="w-[13px] h-[13px] mr-[2px]"
                  />
                  <div className="text-[13px] font-normal font-pretendard text-customGray-500">
                    {formatted}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentPage < totalPages && (
        <div
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="cursor-pointer w-[156px] h-10 px-[61px] py-3 bg-customBlack-300 rounded-lg inline-flex justify-center items-center gap-2.5 mt-[26px] mb-[113px] hover:bg-customGray-600"
        >
          <div className="text-white text-[13px] font-semibold font-['Pretendard']">
            더보기
          </div>
        </div>
      )}
    </div>
  );
}
