"use client";

import Image from "next/image";
import { NavItem } from "@/types/Scheduleindex";

interface Props {
  item: NavItem;
  editingCalendarId: string | null;
  editingLabel: string;
  setEditingCalendarId: (id: string | null) => void;
  setEditingLabel: (label: string) => void;
  onEditComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onCopyUrl: (id: string) => void;
  onClick: (id: string) => void;
}

export default function CalendarNavItem({
  item,
  editingCalendarId,
  editingLabel,
  setEditingCalendarId,
  setEditingLabel,
  onEditComplete,
  onDelete,
  onCopyUrl,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick(item.id)}
      className="flex items-center gap-2 p-3 my-1 rounded-md bg-white transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer hover:bg-gray-100"
    >
      <div className="flex items-center gap-2 w-full pr-10">
        <Image src="/svg/calendar.svg" alt="calendar" width={14} height={13} />
        {editingCalendarId === item.id ? (
          <input
            type="text"
            value={editingLabel}
            onChange={(e) => setEditingLabel(e.target.value)}
            onBlur={() => onEditComplete(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onEditComplete(item.id);
            }}
            className="ml-1 font-semibold text-gray-800 border-b border-gray-400 focus:outline-none"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={(e) => {
              e.stopPropagation();
              setEditingCalendarId(item.id);
              setEditingLabel(item.label);
            }}
            className="ml-1 font-semibold text-gray-800"
          >
            {item.label}
          </span>
        )}
      </div>
      <div className="ml-auto flex gap-4 mr-4 relative">
        <div
          className="p-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onCopyUrl(item.id);
          }}
        >
          <Image
            src="/svg/share.svg"
            alt="share"
            width={30}
            height={24}
            className="transition-transform duration-200 ease-in-out hover:scale-125"
          />
        </div>
        <div
          className="p-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
        >
          <Image
            src="/svg/trash.svg"
            alt="trash"
            width={34}
            height={24}
            className="transition-transform duration-200 ease-in-out hover:scale-125"
          />
        </div>
      </div>
    </div>
  );
}
