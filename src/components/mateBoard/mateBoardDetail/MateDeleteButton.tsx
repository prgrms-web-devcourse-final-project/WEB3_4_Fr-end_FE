import { Button } from "@/components/ui/button";

export default function MateDeleteButton({ PostId }: { PostId: number }) {
  return (
    <Button className="cursor-pointer hover:bg-customGray-700">글 삭제</Button>
  );
}
