"use client";

interface MenuSectionProps {
  title: string;
  items: string[];
  selectedSection: string;
  selectedMenu: string;
  onSelectSection: (section: string) => void;
  onSelectItem: (item: string) => void;
}

export default function MenuSection({
  title,
  items,
  selectedSection,
  selectedMenu,
  onSelectSection,
  onSelectItem,
}: MenuSectionProps) {
  const isOpen = selectedSection === title;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => onSelectSection(title)}
        className={`text-[20px] font-pretendard focus:outline-none ${
          isOpen ? "font-semibold text-customBlack-400" : "text-customGray-500"
        }`}
      >
        {title}
      </button>
      {isOpen && (
        <ul className="pl-2 space-y-2 text-sm transition-all">
          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={() => onSelectItem(item)}
              className={`cursor-pointer ${
                selectedMenu === item
                  ? "text-customBlack-400 font-bold"
                  : "text-[#707070] font-normal"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
