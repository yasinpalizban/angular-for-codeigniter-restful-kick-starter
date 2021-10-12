export interface IPagination {
  uri: {},
  hasMore: boolean,
  total: number,
  perPage: null,
  pageCount: number,
  pageSelector: string,
  currentPage: number,
  next: string | null,
  previous: string | null,
  segment: number
}
