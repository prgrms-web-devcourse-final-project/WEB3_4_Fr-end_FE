import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

export default function MainSchedule() {
  return (
    <div>
      {/* BG */}
      <div className='-mx-56 h-[450px] w-screen bg-customGray-100 mt-14 relative flex'>

      <div className="flex flex-1 items-center justify-center gap-6">
  <div className="flex flex-col items-start ml-60">
    {/* 타이틀 */}
    <div className="flex items-center gap-2">
      <p className="font-bold font-paperlogy text-[56px] text-customblack-400">
        일정 만들고 공유하기
      </p>
      <Image
        src="/svg/marker.svg"
        alt="marker"
        width={40}
        height={40}
        className='ml-1 mt-1'
      />
    </div>

    {/* 서브타이틀 */}
    <div className="mt-3 text-xl">
      <p>
        <span>고민만 하던 여행 계획을 Planit을 통해 친구와 함께</span>
        <br />
        <span>몇 분만에 스케줄링 해보세요!</span>
      </p>
    </div>
    
    {/* 버튼 */}
    <Button className='mt-7 w-[255px] h-[51px] text-xl shadow-black
    transition-transform duration-300 ease-in-out hover:scale-110'>일정 만들러 가기</Button>
  </div>
</div>


      <div className='flex flex-1 justify-center items-center'>
        {/* 노트북 */}
        <Image
        src='/main/notebook.png'
        alt='notebook'
        width={540}
        height={345}
        className='mr-60'/>
      </div>
      </div>

    </div>
  )
}
