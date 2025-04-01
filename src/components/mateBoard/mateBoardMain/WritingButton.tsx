import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WritingButton() {
  return (
    <div>
      <Link href="mateBoard/write">
        <Button>글 작성</Button>
      </Link>
    </div>
  );
}
