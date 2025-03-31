import MateHero from "@/components/mateBoard/MateHero";
import MateBoardFilter from "@/components/mateBoard/MateBoardFilter";
import type { MateCardData } from "../../../types/MateCardData";

import { dummyCards } from "@/dummyData/mateCards";

function mateBoard() {
  return (
    <>
      <div className="pb-20">
        <MateHero />
      </div>

      <div className="pb-20">
        <MateBoardFilter cards={dummyCards} />
      </div>
    </>
  );
}

export default mateBoard;
