import Dropdown from "./Dropdown";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { SearchIcon } from "lucide-react";

export default function MateSearch({
  search,
  category,
  onSearchChange,
  onRegionChange,
  onSubmit,
}: {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const hanldeFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={hanldeFormSubmit} className="flex items-center gap-2">
      <div className="relative w-[500px]">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />

        <Input
          type="search"
          id="search"
          placeholder="검색어를 입력하세요."
          className="pl-10 border-customGray-300"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Dropdown value={category} onChange={onRegionChange} />
      <Button className="p-4" onClick={onSubmit}>
        검색하기
      </Button>
    </form>
  );
}
