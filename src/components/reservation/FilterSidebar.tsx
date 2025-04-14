import { IoIosSearch } from "react-icons/io";

interface FilterSidebarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearchSubmit: () => void;
  selectedCategory: string | null;
  handleCategoryChange: (category: string) => void;
  selectedRegion: string | null;
  handleRegionClick: (region: string) => void;
}

export default function FilterSidebar({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
  selectedCategory,
  handleCategoryChange,
  selectedRegion,
  handleRegionClick,
}: FilterSidebarProps) {
  const categories = ["호텔", "펜션", "모텔", "한옥"];
  const regions = [
    "서울",
    "제주도",
    "강원도",
    "부산",
    "전라도",
    "충청도",
    "경기도",
    "경상도",
    "인천",
  ];

  return (
    <div className="w-[302px] flex flex-col gap-5">
      <div className="font-bold text-xl">필터</div>

      {/* 검색창 */}
      <div className="w-[302px] h-8 px-4 py-1 rounded-[30px] outline-1 outline-offset-[-1px] flex justify-between items-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchSubmit();
          }}
          placeholder="숙소 이름을 입력하세요"
          className="w-full h-full bg-transparent text-[13px] font-normal outline-none"
        />
        <IoIosSearch />
      </div>

      {/* 숙소 유형 필터 */}
      <div className="flex flex-col gap-3">
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <input
              id={category}
              type="radio" // 라디오 버튼으로 변경
              checked={selectedCategory === category} // 단일 선택 상태 확인
              onChange={() => handleCategoryChange(category)} // 단일 선택
              className="hidden"
            />
            <label
              htmlFor={category}
              className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer"
            >
              <span
                className={`w-5 h-5 rounded-full ${
                  selectedCategory === category
                    ? "bg-customBlue-100"
                    : "bg-transparent"
                }`}
              ></span>
            </label>
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* 지역 필터 */}
      <div>
        <div className="border-1 border-customGray-300 mb-5"></div>
        <div className="font-bold mb-5">지역</div>
        <div className="grid grid-cols-3 gap-[10px] text-center">
          {regions.map((region) => (
            <div
              key={region}
              onClick={() => handleRegionClick(region)} // 단일 선택
              className={`py-1 px-6 border rounded-[20px] cursor-pointer ${
                selectedRegion === region
                  ? "bg-customBlue-200 text-white"
                  : "bg-white text-black"
              }`}
            >
              {region}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
