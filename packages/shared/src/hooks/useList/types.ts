export type ListMode = 'infinity' | 'page';

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface List<T> extends Pagination {
  items?: T[];
  params?: Record<string, any>;
}

export type UseListState<T> = List<T>;

export interface UseListOptions<T> extends Partial<List<T>> {
  mode?: ListMode;
  loading?: boolean;
  url: string;
  params?: Record<string, any>;
  autoFetch?: boolean;
  format?: (items: any) => any;
}

export interface UseListInstance<T> extends UseListState<T> {
  loading: boolean;
  isFirst: boolean;
  isLast: boolean;
  data?: T[];

  // async methods
  reFetch(params: Record<string, any>): void;
  refresh(): void;
  gotoPage(page: number): void;
  nextPage(): void;
  prevPage(): void;

  // sync methods
  clear(): void;
}
