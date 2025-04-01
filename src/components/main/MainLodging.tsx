import React from 'react'
import Image from 'next/image';
import { Button } from '../ui/button';

export default function MainLodging() {
  return (
    <div>
      <div className='relative'>
        {/* 타이틀 */}
        <p className='font-paperlogy text-4xl pt-16'>숙소 예약하기</p>
        <div className='flex justify-between'>

        {/* 서브타이틀 */}
        <p className='text-lg pt-2 font-medium'>국내여행 숙소 모두 여기서, 숙소 찾고 결제까지 Planit에서 한번에!</p>
        {/* 버튼*/}
        <Button className='mr-2 mb-4 rounded-2xl w-28 shadow-customBlack-400
        transition-transform duration-300 ease-in-out hover:scale-110'>전체보기</Button>
        </div>

      {/* 이미지1 */}
        <div className="flex w-full gap-14 ">
  <div className="pt-4 flex-grow-[5] relative h-[418px] transition-transform duration-300 ease-in-out hover:scale-105">
    <Image 
      src='/main/lodging1.jpg' 
      alt='mainlodging' 
      fill
      className='rounded-2xl object-cover w-full shadow-custom-figma'
    />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-2xl "></div>
        <p className="absolute top-[290px] right-[130px] text-white text-5xl font-bold">
      숙소 찾아보기
    </p>
    <p className="absolute top-[350px] right-[130px] text-white text-2xl font-bold">
    호텔, 모텔, 펜션, 풀빌라, 카라반 모두 한곳에서!
    </p>
    <div className="absolute top-[310px] right-[50px] flex items-center">
    <Image 
      src='/svg/arrow.svg' 
      alt='arrow icon'
      width={48}
      height={48}
      className="text-white"
    />
    </div>
  </div>
  
   {/* 이미지2 */}
  <div className="pt-4 flex-grow-[3] relative transition-transform duration-300 ease-in-out hover:scale-105">
    <Image 
      src='/main/lodging2.jpg' 
      alt='mainlodging' 
      fill
      className='rounded-2xl object-cover w-full h-full shadow-custom-figma'
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-2xl"></div>
    <p className="absolute top-[290px] right-[130px] text-white text-5xl font-bold">
    Planit 추천 숙소
    </p>
    <p className="absolute top-[350px] right-[130px] text-white text-xl font-bold">
    Planit이 추천하는 인기 숙소! 결제까지 한번에~
    </p>
    <div className="absolute top-[310px] right-[50px] flex items-center">
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

      {/* 첫결제 배너 */}
      <div className='relative flex w-full justify-center items-center h-16 top-14 
      bg-customGray-600 rounded-2xl text-customGray-100 font-bold text-sm gap-8 shadow-custom-figma'>
         <p>
        <span className="font-extrabold ">첫 결제, 최대 10% 페이백</span>
        <br />
    <span className="font-medium">최저가 숙소 둘러보기</span>
    </p>
    <Image 
      src='/main/hand.png' 
      alt='hand icon'
      width={70}
      height={48}
    />
      </div>

    </div>
  )
}
