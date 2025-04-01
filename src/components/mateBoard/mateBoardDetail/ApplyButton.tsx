import { Button } from "@/components/ui/button";

export default function ApplyButton() {
  return (
    <Button
      type="submit"
      className="p-5 w-30 text-[16px] cursor-pointer hover:bg-customGray-700 focus:outline-2 "
    >
      동행 신청
    </Button>
  );
}
