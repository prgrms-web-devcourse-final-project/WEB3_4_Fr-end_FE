"use client";
import { deletePost } from "@/apis/mateBoard/deletePost";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/mateBoard/common/ConfirmModal";
import { useState } from "react";

export default function MateDeleteButton({ PostId }: { PostId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleModalOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalPosition({ x: e.clientX, y: e.clientY });
    setIsModalOpen(true);
  };

  const router = useRouter();
  const handleDelete = async () => {
    try {
      const result = await deletePost(PostId);
      console.log(result);
      setIsModalOpen(false);
      router.push("/mateBoard");
    } catch (error) {
      console.error("게시글 삭제 에러:", error);
    }
  };
  return (
    <div>
      <Button
        onClick={handleModalOpen}
        className="cursor-pointer hover:bg-customGray-700"
      >
        글 삭제
      </Button>
      {isModalOpen && modalPosition && (
        <ConfirmModal
          message="정말로 게시글을 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
          position={modalPosition}
        />
      )}
    </div>
  );
}
