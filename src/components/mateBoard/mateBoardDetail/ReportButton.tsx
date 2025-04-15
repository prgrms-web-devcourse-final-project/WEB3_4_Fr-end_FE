import toast from "react-hot-toast";

export default function ReportButton() {
  const handleClick = () => {
    toast.success("불량유저 신고가 접수되었습니다!");
  };
  return (
    <button className="text-red-500 cursor-pointer" onClick={handleClick}>
      <span>🚨 불량유저 신고</span>
    </button>
  );
}
