import React, { useEffect, useRef } from 'react';
import { Column as TableColumn, TableState } from 'react-table';
import { useQuery } from 'react-query';
import { useLocalStorage } from '@kubed/hooks';
import { Suggestions } from './Toolbar';
import request from '../../utils/request';
import { initialState, State } from './reducer';
import { merge } from 'lodash';

export interface Column {
  title: string | React.ReactNode;
  description?: { title?: string; content?: React.ReactNode };
  field: string;
  id?: string;
  searchable?: boolean;
  sortable?: boolean;
  filterOptions?: { label: string | React.ReactNode; key: any }[];
  canHide?: boolean;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  render?: (value: any, row: Record<string, any>) => any;
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: Column[];
  tableName: string;
  rowKey: string;
  className?: string;
  loading?: boolean;
  emptyPlaceholder?: React.ReactNode;
  footer?: React.ReactNode;
  onChange?: (state: TableState<T>) => any;
  data?: Array<T>;
  initialState?: Record<string, any>;
  manualSortBy?: boolean;
  manualFilters?: boolean;
  totalCount?: number;
  showToolbar?: boolean;
  showFooter?: boolean;
  url?: string;
  fetchCallback?: (data: Array<T>) => any;
  batchActions?: React.ReactNode;
  onSelect?: (selectedRowKeys?: string[], selectedRows?: Array<T>) => any;
  disableRowSelect?: (row?: Record<string, any>) => boolean;
  onFilter?: () => any;
  onSort?: () => any;
  simpleSearch?: boolean;
  placeholder?: string;
  selectType?: 'checkbox' | 'radio' | boolean;
  useStorageState?: boolean;
}

export function prepareColumns<T extends Record<string, unknown>>(
  columns: Column[] = [],
): { formatColumns: TableColumn<T>[]; suggestions: Suggestions } {
  const formatColumns: TableColumn<T>[] = [];
  const suggestions: Suggestions = [];
  columns.forEach(column => {
    const { title: Header, field: accessor, id, filterOptions, width, render, ...rest } = column;

    const formatColumn = {
      Header,
      accessor,
      id: id || accessor,
      width: width || 0,
      Cell: (props: any) => {
        if (!render) {
          return String(props.value);
        }
        return render(props.value, props.row.original);
      },
      filterOptions,
      ...rest,
    } as TableColumn<T>;
    formatColumns.push(formatColumn);

    if (filterOptions || column.searchable) {
      suggestions.push({
        label: Header,
        key: id || accessor,
        options: filterOptions,
      });
    }
  });
  return { formatColumns, suggestions };
}

const transformRequestParams = (params: State) => {
  const ret: Record<string, any> = {};

  if (params.filters.length > 0) {
    params.filters.forEach(filter => {
      ret[filter.id] = filter.value;
    });
  }

  if (params.sortBy.length > 0) {
    params.sortBy.forEach(sort => {
      ret.sortBy = sort.id;
      if (!sort.desc) {
        ret.ascending = true;
      }
    });
  }

  ret.limit = params.pageSize;
  ret.page = params.pageIndex + 1;

  return ret;
};

export const useData = (url: string, params: State) => {
  // console.log(params);
  const requestParams = transformRequestParams(params);
  return useQuery(
    ['key', params.pageIndex, params.filters, params.sortBy],
    async () => {
      const data = await request(url, { params: requestParams });
      return data as any;
    },
    {
      keepPreviousData: true,
      staleTime: 15000,
    },
  );
};

export const getInitialState = (tableName: string, useStorageState?: boolean) => {
  const [storageState] = useLocalStorage({ key: `tableState:${tableName}` });
  const parsedStorageState: State = JSON.parse(storageState);
  if (!useStorageState) {
    return { ...initialState, hiddenColumns: parsedStorageState?.hiddenColumns };
  }

  const mergedState = merge(initialState, parsedStorageState);
  return mergedState;
};

export function useDidUpdate(fn: () => void, dependencies?: any[]) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      fn();
    } else {
      mounted.current = true;
    }
  }, dependencies);
}
