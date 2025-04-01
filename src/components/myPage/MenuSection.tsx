"use client";

import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
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
              onClick={() => {
                if (selectedSection !== title) {
                  onSelectSection(title);
                }
                onSelectItem(item);
              }}
              className={`cursor-pointer ${
                selectedSection === title && selectedMenu === item
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
