import Image from 'next/image'
import React from 'react'

export default function MainSchedule() {
  return (
    <div>
      {/* BG */}
      <div className='-mx-52 h-[450px] w-screen bg-customGray-100 mt-14 relative flex'>

      <div className='flex flex-1 items-center justify-center gap-6'>
        {/* 타이틀 */}
        <p className='font-bold font-paperlogy text-[56px] text-customblack-400'>
          일정 만들고 공유하기
        </p>

        {/* 마커 */}
        <Image
        src='/svg/marker.svg'
        alt='marker'
        width={40}
        height={40}/>

        {/* 서브타이틀 */}
        <p>
          <span className='text-xl'>고민만 하던 여행 계획을 Planit을 통해 친구와 함께</span>
          <br />
          <span className=''>몇 분만에 스케줄링 해보세요!</span>
          
        </p>

      </div>
      <div className='flex flex-1 justify-center items-center'>
        {/* 노트북 */}
        <Image
        src='/main/notebook.png'
        alt='notebook'
        width={460}
        height={345}/>
      </div>
      </div>

    </div>
  )
}
