import Image from 'next/image'
import {Button} from '../ui/button'

export default function MainAbout() {
  return (
    <div>

<div className="relative flex gap-4">
<div className="flex-1 flex flex-col gap-4">
  {/* 타이틀 */}
  <p className="font-paperlogy text-4xl mt-14 self-center">
    설레는 봄, 여행 더 알아보기
  </p>

  <div className="flex gap-6 mt-2">
    <div className="relative w-[360px] h-[220px] transition-transform duration-300 ease-in-out hover:scale-105">
      <Image
        src="/main/glamping.jpg"
        alt="glamping"
        width={360}
        height={200}
        className="rounded-lg object-cover w-full h-full"
      />
      <p className="absolute whitespace-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customGray-100 font-bold text-3xl">
        지금 날씨에 딱! 글램핑
      </p>
    </div>

    <div className="relative w-[360px] h-[220px] transition-transform duration-300 ease-in-out hover:scale-105">
      <Image
        src="/main/spring.jpg"
        alt="spring"
        width={360}
        height={200}
        className="rounded-lg object-cover w-full h-full"
      />
      <p className="absolute whitespace-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customGray-100 font-bold text-3xl">
        꽃내음 가득한 봄 여행지
      </p>
    </div>
  </div>
</div>



  {/* 달력 섹션 */}
  <div className="flex-1 flex items-center justify-center mt-6">
    <div className='mt-16'>
  <p className="font-paperlogy text-4xl">
      메이트 구하기
    </p>
    <p className="font-pretendard text-[20px] mt-[15px]">
    <span>
    준비는 끝, 같이 갈 여행 친구가
    </span>
    <br />
    <span>
    필요하신가요?
    </span>
    <br />
    <span>
    지금 바로 여행메이트를 구해보세요!
    </span>
    </p>
    <Button className='bg-customGray-100 text-customBlack-400 shadow-black
    mt-8 w-[280px] h-[50px] font-bold text-xl mb-20 hover:bg-customGray-300
    transition-transform duration-300 ease-in-out hover:scale-105'>게시판 바로가기</Button>
    </div>
    <div className="ml-4">
    <Image
      src="/main/calender.png"
      alt="calender"
      width={300}
      height={200}
      className="rounded-lg"
    />
  </div>
  </div>
</div>


    </div>
  )
}
