"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { travelRegions } from "@/constants/travelRegion";

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

  const selected = travelRegions.find((region) => region.value === value);

  const filtered = travelRegions.filter((region) =>
    region.label.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("flex gap-4 border-customGray-300", className)}
        >
          {selected?.label ?? "지역선택"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50 h-60" align="start" sideOffset={10}>
        <div className="px-2 py-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="지역 검색"
            className="h-6 text-sm"
          />
        </div>

        {filtered.map((region) => (
          <DropdownMenuItem
            key={region.value}
            onClick={() => {
              onChange(region.value);
              setSearch("");
            }}
          >
            {region.label}
          </DropdownMenuItem>
        ))}

        {filtered.length === 0 && (
          <DropdownMenuItem disabled>결과 없음</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
