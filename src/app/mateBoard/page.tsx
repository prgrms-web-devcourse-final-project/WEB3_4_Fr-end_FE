// app/mateBoard/page.jsx
import MateHero from "@/components/mateBoard/mateBoardMain/MateHero";
import MateBoardFilter from "@/components/mateBoard/mateBoardMain/MateBoardFilter";
import { getMateBoardPosts } from "@/apis/mateBoard/getMateBoardPosts";
import { MateCardData } from "@/types/MateCardData";

export default async function MateBoard() {
  let cards: MateCardData[] = [];
  try {
    cards = await getMateBoardPosts();
  } catch (error) {
    console.error("게시글 불러오기 에러:", error);
  }

  return (
    <>
      <div className="pb-20">
        <MateHero />
      </div>
      <div className="pb-20">
        <MateBoardFilter cards={cards} />
      </div>
    </>
  );
}
