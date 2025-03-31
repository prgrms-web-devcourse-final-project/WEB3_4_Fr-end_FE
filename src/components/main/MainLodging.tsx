import React from 'react'
import Image from 'next/image';
import { Button } from '../ui/button';

export default function MainLodging() {
  return (
    <div>
      <div className='relative'>
        <p className='font-paperlogy text-4xl pt-16'>숙소 예약하기</p>
        <div className='flex justify-between'>
        <p className='text-lg pt-2 font-medium'>국내여행 숙소 모두 여기서, 숙소 찾고 결제까지 Planit에서 한번에!</p>
        <Button className='mr-2 mb-4 rounded-2xl w-28 shadow-customBlack-400'>전체보기</Button>
        </div>
        <div className="flex w-full gap-14 ">
  <div className="pt-4 flex-grow-[5] relative h-[418px] transition-transform duration-300 ease-in-out hover:scale-105">
    <Image 
      src='/main/lodging1.jpg' 
      alt='mainlodging' 
      fill
      className='rounded-2xl object-cover w-full'
    />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-2xl"></div>
        <p className="absolute top-[290px] right-[130px] text-white text-5xl font-bold">
      숙소 찾아보기
    </p>
    <p className="absolute top-[350px] right-[130px] text-white text-xl font-bold">
    호텔, 모텔, 펜션, 풀빌라, 카라반 모두 한곳에서!
    </p>
    <div className="absolute top-[310px] right-[50px] flex items-center space-x-2">
    <Image 
      src='/svg/arrow.svg' 
      alt='arrow icon'
      width={48}
      height={48}
      className="text-white"
    />
    </div>
  </div>
  
  <div className="pt-4 flex-grow-[3] relative transition-transform duration-300 ease-in-out hover:scale-105">
    <Image 
      src='/main/lodging2.jpg' 
      alt='mainlodging' 
      fill
      className='rounded-2xl object-cover w-full h-full'
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-2xl"></div>
    <p className="absolute top-[290px] right-[130px] text-white text-5xl font-bold">
    Planit 추천 숙소
    </p>
    <p className="absolute top-[350px] right-[130px] text-white text-xl font-bold">
    Planit이 추천하는 인기 숙소! 결제까지 한번에~
    </p>
    <div className="absolute top-[310px] right-[50px] flex items-center space-x-2">
    <Image 
      src='/svg/arrow.svg' 
      alt='arrow icon'
      width={48}
      height={48}
      className="text-white"
    />
    </div>
  </div>
</div>
      </div>
      <div className='h-20'></div>
    </div>
  )
}
