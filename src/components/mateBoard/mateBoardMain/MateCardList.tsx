import MateCard from "./MateCard";
import type { MateCardData } from "@/../../types/MateCardData";

export default function MateCardList({ cards }: { cards: MateCardData[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 place-items-center">
      {cards.map((card) => (
        <MateCard key={card.id} data={card} />
      ))}
    </div>
  );
}
