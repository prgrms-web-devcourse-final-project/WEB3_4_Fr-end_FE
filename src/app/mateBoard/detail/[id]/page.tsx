import ApplyButton from "@/components/mateBoard/mateBoardDetail/ApplyButton";
import CommentButton from "@/components/mateBoard/mateBoardDetail/CommentButton";
import CommentCardList from "@/components/mateBoard/mateBoardDetail/CommentCardList";
import MateDetailHero from "@/components/mateBoard/mateBoardDetail/MateDetailHero";
import MateDetailInfo from "@/components/mateBoard/mateBoardDetail/MateDetailInfo";

export default function MateDetailPage() {
  return (
    <>
      <div className="my-10">
        <MateDetailHero />
      </div>
      <div className="mb-10">
        <MateDetailInfo />
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
      <div className="mb-10 flex flex-col items-center">
        <ApplyButton />
      </div>
    </>
  );
}
