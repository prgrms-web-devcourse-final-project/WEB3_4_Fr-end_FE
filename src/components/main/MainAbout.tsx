import Image from 'next/image'
import {Button} from '../ui/button'

export default function MainAbout() {
  return (
    <div>

<div className="relative flex gap-4">
  <div className="flex-1 flex flex-col items-center gap-4">
    {/* 타이틀 */}
    <p className="font-paperlogy text-4xl mt-16">
      설레는 봄, 여행 더 알아보기
    </p>

    {/* 이미지 */}
    <div className="flex gap-2">
      <Image
        src="/main/glamping.jpg"
        alt="glamping"
        width={303}
        height={200}
        className="rounded-lg"
      />
      <Image
        src="/main/spring.jpg"
        alt="spring"
        width={303}
        height={200}
        className="rounded-lg"
      />
    </div>
  </div>

  {/* 달력 섹션 */}
  <div className="flex-1 flex items-center justify-center">
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
    <Button className='bg-customGray-100 text-customBlack-400'>게시판 바로가기</Button>
    </div>
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
  )
}
