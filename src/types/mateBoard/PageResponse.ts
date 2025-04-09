export interface PageResponse<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalData: number;
  data: T[];
}
