import MateCard from "@/components/mateBoard/mateBoardMain/MateCard";
import type { MateCardData } from "@/types/mateBoard/MateCardData";

interface MateCardListProps {
  cards: MateCardData | MateCardData[];
}

export default function MateCardList({ cards }: MateCardListProps) {
  // cards가 배열이면 그대로 사용, 단일 객체면 배열로 변환
  const cardsArray = Array.isArray(cards) ? cards : [cards];

  // undefined나 null인 값은 제거
  const validCards = cardsArray.filter((card) => card != null);

  return (
    <div className="grid grid-cols-2 gap-6 place-items-center">
      {validCards.map((card) => (
        <MateCard key={card.id} data={card} />
      ))}
    </div>
  );
}
