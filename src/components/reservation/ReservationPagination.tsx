import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): (number | string)[] {
  const pages: (number | string)[] = [];
  const half = Math.floor(maxVisiblePages / 2);

  let start = Math.max(currentPage - half, 1);
  let end = Math.min(currentPage + half, totalPages);

  if (currentPage <= half) {
    end = Math.min(maxVisiblePages, totalPages);
  } else if (currentPage + half > totalPages) {
    start = Math.max(totalPages - maxVisiblePages + 1, 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (start > 1) {
    pages.unshift("...");
    pages.unshift(1);
  }

  if (end < totalPages) {
    pages.push("...");
    pages.push(totalPages);
  }

  return pages;
}

export default function ReservationPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <Pagination className="mt-20 justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {visiblePages.map((page, index) =>
          typeof page === "number" ? (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <span className="ellipsis">...</span>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
