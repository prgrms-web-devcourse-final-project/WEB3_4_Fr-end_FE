// app/mateBoard/page.tsx
import MateHero from "@/components/mateBoard/mateBoardMain/MateHero";
import FilterController from "@/components/mateBoard/mateBoardMain/FilterController";
import { getMateBoardPosts } from "@/apis/mateBoard/getMateBoardPosts";
import { MateCardData } from "@/types/mateBoard/MateCardData";

type PageProps = {
  searchParams: {
    keyword?: string;
    region?: string;
    category?: string;
    page?: string;
  };
};

export default async function MateBoard({ searchParams }: PageProps) {
  // 쿼리 파라미터로부터 필터 값 설정 (없으면 기본값 사용)
  const sp = await searchParams;
  const filters = {
    keyword: sp.keyword ?? "",
    region: sp.region && sp.region.trim() !== "" ? sp.region : "OPEN",
    category: sp.category && sp.category.trim() !== "" ? sp.category : "ALL",
    page: sp.page ? Number(sp.page) - 1 : 0,
    size: 10, // 한 페이지당 항목 수 (백엔드 로직과 맞추기)
    sort: "id,desc",
  };

  let cards: MateCardData[] = [];
  let totalPages = 0;
  const currentPage = filters.page;

  try {
    // getMateBoardPosts 함수는 PageResponse<MateCardData>를 반환한다고 가정합니다.
    const pageResponse = await getMateBoardPosts(filters);
    cards = pageResponse.content;
    totalPages = pageResponse.totalPages;
  } catch (error) {
    console.error("게시글 불러오기 에러:", error);
  }

  return (
    <>
      <div className="pb-20">
        <MateHero />
      </div>
      <div className="pb-20">
        <FilterController
          cards={cards}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
