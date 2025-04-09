"use client";
import { Button } from "@/components/ui/button";

const uiToBackendMapping: Record<string, string> = {
  전체: "ALL",
  모집중: "OPEN",
  모집완료: "CLOSED",
};

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
          onClick={() => onChange(uiToBackendMapping[filter])}
          className={`px-4 py-1  text-sm font-medium transition
            ${
              value === uiToBackendMapping[filter]
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
