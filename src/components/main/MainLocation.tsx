"use client";

import Image from 'next/image'; 
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const locationData = [
  { id: 1, image: "/main/seoul.jpg", title: "서울" },
  { id: 2, image: "/main/incheon.jpg", title: "인천" },
  { id: 3, image: "/main/gangneung.jpg", title: "강원도" },
  { id: 4, image: "/main/jeju.jpg", title: "제주도" },
  { id: 5, image: "/main/busan.jpg", title: "부산" },
];

export default function MainLocation() {
  const router = useRouter();

  const handleClick = (region: string) => {
    router.push(`/reservation/search?region=${encodeURIComponent(region)}&page=1`);
  };

  return (
    <div>
      <div className='relative mt-14'>
        <p className='font-paperlogy text-4xl pt-16'>지역별 인기 숙소</p>
        <div className='flex justify-between'>
          <p className='text-lg pt-2 font-medium'>현재 가장 예약이 많은 지역별 숙소를 확인하세요!</p>
          <Button className='mr-2 mb-4 rounded-2xl w-28 shadow-customBlack-400
            transition-transform duration-300 ease-in-out hover:scale-110'>
            전체보기
          </Button>
        </div>
      </div>

      {/* 지역 카드 */}
      <div className='flex w-full gap-8'>
        {locationData.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.title)}
            className='relative flex flex-col w-full h-[300px] shadow-custom-figma rounded-lg 
              transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer'
          >
            <Image
              src={item.image}
              alt='mainlocation'
              fill
              className="rounded-lg object-fill"
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-lg'></div>
            <p className='absolute text-[38px] text-customGray-100 font-bold top-[80%] right-[25%]'>
              {item.title}
            </p>
            <Image
              src='/svg/arrow.svg'
              alt='mainlocation'
              width={33}
              height={48}
              className='absolute top-[85%] right-[7%]'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
