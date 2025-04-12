import { deletePost } from "@/apis/mateBoard/deletePost";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MateDeleteButton({ PostId }: { PostId: number }) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm("게시글을 삭제하시겠습니까?");
      if (!confirmed) return;
      const result = await deletePost(PostId);
      console.log(result);
      router.push("/mateBoard");
    } catch (error) {
      console.error("게시글 삭제 에러:", error);
    }
  };
  return (
    <Button
      onClick={handleDelete}
      className="cursor-pointer hover:bg-customGray-700"
    >
      글 삭제
    </Button>
  );
}
