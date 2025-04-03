import { FaComment } from "react-icons/fa";
export default function CommentCount({ count = 0 }: { count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <FaComment
        size={15}
        className=" text-white drop-shadow-[0_0_1px_black]"
      />
      <span>{count}</span>
    </div>
  );
}
