import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MateEditButton({ PostId }: { PostId: number }) {
  return (
    <Link href={`/mateBoard/edit/${PostId}`}>
      <Button className="cursor-pointer hover:bg-customGray-700">
        글 수정
      </Button>
    </Link>
  );
}
