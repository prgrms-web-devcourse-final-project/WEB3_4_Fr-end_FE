import { Input } from "../ui/input";

export default function NavSearch() {
  return (
    <Input
      type="search"
      placeholder="검색어를 입력하세요."
      className="max-w-xs dark:bg-muted"
    />
  );
}
