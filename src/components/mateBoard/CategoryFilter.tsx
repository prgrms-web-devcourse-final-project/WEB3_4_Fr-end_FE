"use client";
import { Button } from "../ui/button";

export default function CategoryFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const filters = ["전체", "모집중", "모집완료"];

  return (
    <div className="flex gap-3 ">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant="default"
          onClick={() => onChange(filter)}
          className={`px-4 py-1  text-sm font-medium transition
            ${
              value === filter
                ? " text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
