"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["전체", "서울", "부산", "제주도", "대구"];

export default function Dropdown({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
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
          className={cn("flex gap-4 border-customGray-300", className)}
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
