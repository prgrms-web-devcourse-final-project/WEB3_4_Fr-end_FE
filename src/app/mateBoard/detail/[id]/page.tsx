import ApplyButton from "@/components/mateBoard/mateBoardDetail/ApplyButton";
import CommentButton from "@/components/mateBoard/mateBoardDetail/CommentButton";
import CommentCardList from "@/components/mateBoard/mateBoardDetail/CommentCardList";
import MateDetailHero from "@/components/mateBoard/mateBoardDetail/MateDetailHero";
import MateDetailInfo from "@/components/mateBoard/mateBoardDetail/MateDetailInfo";
import LikeButtonInfo from "@/components/mateBoard/mateBoardDetail/LikeButtonInfo";

export default function MateDetailPage() {
  return (
    <>
      <div className="my-10">
        <MateDetailHero />
      </div>
      <div className="mb-5">
        <MateDetailInfo />
      </div>
      <div className="mb-15 flex gap-4 items-center justify-center">
        <ApplyButton />
        <LikeButtonInfo />
      </div>
      <div className="mb-10 flex justify-center items-center  ">
        <div className="w-full max-w-5xl">
          <CommentButton />
        </div>
      </div>
      <div className="mb-10 flex justify-center items-center">
        <div className="w-full max-w-5xl">
          <CommentCardList />
        </div>
      </div>
    </>
  );
}
