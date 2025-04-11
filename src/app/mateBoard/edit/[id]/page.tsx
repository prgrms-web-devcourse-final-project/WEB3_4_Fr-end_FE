import MateEditForm from "@/components/mateBoard/mateBoardEdit/MateEditForm";
import { getMateBoardDetail } from "@/apis/mateBoard/getMateBoardDetail";
import type { MateDetailData } from "@/types/mateBoard/MateDetailData";

type EditPageProps = {
  params: { id: string };
};

export default async function EditPage({ params }: EditPageProps) {
  const id = Number(params.id);
  const data: MateDetailData = await getMateBoardDetail(id);

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  // MateDetailData가 문자열 날짜 필드를 가지고 있다면 Date 객체로 변환
  const editData = {
    id: data.matePostId,
    title: data.title,
    travelStartDate: new Date(data.travelStartDate),
    travelEndDate: new Date(data.travelEndDate),
    recruitCount: data.recruitCount,
    content: data.content,
    travelRegion: data.travelRegion,
    mateGender: data.mateGender,
  };

  return <MateEditForm data={editData} />;
}
