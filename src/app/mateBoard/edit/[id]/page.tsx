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

  const editData = {
    id: data.matePostId,
    title: data.title,
    travelStartDate: new Date(data.travelStartDate),
    travelEndDate: new Date(data.travelEndDate),
    recruitCount: data.recruitCount,
    content: data.content,
    travelRegion: data.travelRegion,
    mateGender: data.mateGender,
    imageUrl: data.imageUrl,
  };

  return <MateEditForm data={editData} />;
}
