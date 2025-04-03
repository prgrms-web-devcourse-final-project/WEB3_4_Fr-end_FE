import MateHero from "@/components/mateBoard/mateBoardMain/MateHero";
import MateBoardFilter from "@/components/mateBoard/mateBoardMain/MateBoardFilter";

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
