"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";

const categories = ["전체", "서울", "부산", "제주도", "대구"];

export default function Dropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-4 w-[80px] border-customGray-300"
        >
          {value}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="start" sideOffset={10}>
        <div className="px-2 py-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="카테고리 검색"
            className="h-8 text-sm"
          />
        </div>

        {filtered.map((cat) => (
          <DropdownMenuItem
            key={cat}
            onClick={() => {
              onChange(cat);
              setSearch("");
            }}
          >
            {cat}
          </DropdownMenuItem>
        ))}

        {filtered.length === 0 && (
          <DropdownMenuItem disabled>결과 없음</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
