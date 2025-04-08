import ApplyButton from "@/components/mateBoard/mateBoardDetail/ApplyButton";
import CommentButton from "@/components/mateBoard/mateBoardDetail/CommentButton";
import CommentCardList from "@/components/mateBoard/mateBoardDetail/CommentCardList";
import MateDetailHero from "@/components/mateBoard/mateBoardDetail/MateDetailHero";
import MateDetailInfo from "@/components/mateBoard/mateBoardDetail/MateDetailInfo";
import LikeButtonInfo from "@/components/mateBoard/mateBoardDetail/LikeButtonInfo";
import { getMateBoardDetail } from "@/apis/mateBoard/getMateBoardDetail";
import { MateDetailData } from "@/types/MateDetailData";

type MateDetailPageProps = {
  params: { id: string };
};
export default async function MateDetailPage({ params }: MateDetailPageProps) {
  const id = Number(params.id);
  const data: MateDetailData = await getMateBoardDetail(id);

  if (!data) {
    // notFound(); 404페이지
    console.error("데이터가 없습니다.");
  }
  return (
    <>
      <div className="my-10">
        <MateDetailHero />
      </div>
      <div className="mb-5">
        <MateDetailInfo data={data} />
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
