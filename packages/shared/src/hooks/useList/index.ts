import { useState, useMemo, useEffect } from 'react';
import { useQuery } from 'react-query';
import request from '../../utils/request';
import type { UseListInstance, UseListOptions, UseListState } from './types';

const useData = (
  url: string,
  params: Record<string, any> = {},
  autoFetch: boolean = true,
  callback?: (data: any) => any,
) => {
  return useQuery(
    // @ts-ignore
    ['useList', url, params],
    async () => {
      const data = await request(url, { params });
      return data as any;
    },
    {
      keepPreviousData: true,
      staleTime: 15000,
      enabled: autoFetch,
      onSuccess: data => {
        if (callback) callback(data);
      },
    },
  );
};

const formatData = (data: any[], format: (items: any) => any) => {
  return data.map(item => format(item));
};

export type { UseListOptions };

export function useList<T>(options: UseListOptions<T>): UseListInstance<T> {
  const mode = options.mode || 'page';
  const autoFetch = options.autoFetch || true;

  const [state, setState] = useState<UseListState<T>>({
    items: [],
    page: options.page || 1,
    pageSize: options.pageSize || 10,
    total: 0,
    params: options.params,
  });

  const { data, isFetching, isSuccess, refetch } = useData(
    options.url,
    {
      ...state.params,
      page: state.page,
    },
    autoFetch,
  );

  useEffect(() => {
    if (isSuccess) {
      const totalCount = data?.totalItems || data?.total_count || data?.length;
      const items = options.format ? formatData(data?.items, options.format) : data?.items;
      if (mode === 'page') {
        setState({
          ...state,
          total: totalCount,
          items,
        });
      } else {
        const newState = state.items || [];
        newState.push(...items);

        setState({
          ...state,
          total: totalCount,
          items: newState,
        });
      }
    }
  }, [isSuccess, data]);

  const isFirst = useMemo<boolean>(() => state.page === 1, [state.page, state.total]);

  const isLast = useMemo<boolean>(
    () => state.total > 0 && state.page >= state.total / state.pageSize,
    [state.page, state.total],
  );

  function fetch() {
    if (!autoFetch) {
      refetch();
    }
  }

  function refresh() {
    if (mode === 'page') {
      refetch();
    } else {
      setState({
        ...state,
        page: 1,
      });
      fetch();
    }
  }

  function reFetch(params: Record<string, any>) {
    setState({
      ...state,
      items: [],
      total: 0,
      page: 1,
      params: { ...state.params, ...params },
    });
    fetch();
  }

  function clear() {
    setState({ items: [], page: 1, pageSize: 10, total: 0 });
  }

  function gotoPage(page: number) {
    setState({
      ...state,
      page,
    });
    fetch();
  }

  function prevPage() {
    if (!isFirst) {
      gotoPage(state.page - 1);
    }
  }

  function nextPage() {
    if (!isLast) {
      gotoPage(state.page + 1);
    }
  }

  return {
    isLoading: isFetching,
    isFirst,
    isLast,
    data: state.items,
    ...state,
    refresh,
    reFetch,
    prevPage,
    nextPage,
    gotoPage,
    clear,
  };
}
