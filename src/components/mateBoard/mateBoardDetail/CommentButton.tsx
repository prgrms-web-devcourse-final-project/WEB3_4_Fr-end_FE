export default function CommentButton() {
  return (
    <div className="max-w-5xl">
      <div className="space-y-3">
        {/* 제목 */}
        <h3 className="text-base font-semibold text-gray-800">댓글</h3>

        {/* 입력창 박스 */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="댓글을 작성해 주세요."
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
          />
          <button type="submit" className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19l7-7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
