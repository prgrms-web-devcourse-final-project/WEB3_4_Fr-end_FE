import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function LikeButtonInfo() {
  return (
    <Button
      variant="secondary"
      type="submit"
      className="p-5 w-30 text-[16px] cursor-pointer hover:bg-customGray-200 focus:outline-2 "
    >
      <Heart />
      <span>좋아요</span>
    </Button>
  );
}
