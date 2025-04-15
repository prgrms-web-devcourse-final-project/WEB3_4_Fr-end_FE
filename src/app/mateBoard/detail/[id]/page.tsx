import ApplyButton from "@/components/mateBoard/mateBoardDetail/ApplyButton";
import MateDetailHero from "@/components/mateBoard/mateBoardDetail/MateDetailHero";
import MateDetailInfo from "@/components/mateBoard/mateBoardDetail/MateDetailInfo";
import LikeButtonInfo from "@/components/mateBoard/mateBoardDetail/LikeButtonInfo";
import { getMateBoardDetail } from "@/apis/mateBoard/getMateBoardDetail";
import { MateDetailData } from "@/types/mateBoard/MateDetailData";
import CommentsSection from "@/components/mateBoard/mateBoardDetail/CommentSection";

type MateDetailPageProps = {
  params: { id: string };
};
export default async function MateDetailPage({ params }: MateDetailPageProps) {
  const awaitedParam = await params;
  const id = Number(awaitedParam.id);
  const data: MateDetailData = await getMateBoardDetail(id);

  if (!data) {
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
        <ApplyButton data={data} />
        <LikeButtonInfo data={data} />
      </div>
      <div className="mb-10 flex justify-center items-center">
        <div className="w-full max-w-5xl">
          <CommentsSection postId={id} />
        </div>
      </div>
    </>
  );
}
