import React, {
  PropsWithChildren,
  ReactElement,
  useMemo,
  useReducer,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useRowSelect,
  // useFlexLayout,
  Hooks,
  HeaderProps,
  CellProps,
} from 'react-table';
import cx from 'classnames';
import { get } from 'lodash';
import { Checkbox, LoadingOverlay } from '@kubed/components';
import { useLocalStorage, useDebouncedValue } from '@kubed/hooks';
import TableHead from './TableHead';
import { TableWrapper, TableMain, Table, TBody } from './styles';
import { TableFooter } from './TableFooter';
import { Toolbar } from './Toolbar';
import { TableEmpty } from './Empty';
import {
  prepareColumns,
  TableProps,
  Column,
  useData,
  getInitialState,
  useDidUpdate,
} from './utils';
import {
  PAGE_CHANGED,
  SORTBY_CHANGED,
  reducer,
  FILTER_CHANGED,
  TOTAL_COUNT_CHANGED,
} from './reducer';

export type { Column, TableProps };

const selectionHook = (hooks: Hooks<any>) => {
  hooks.getToggleAllRowsSelectedProps = [
    (props, { instance }) => {
      return [
        props,
        {
          onChange: () => {
            instance.rows.forEach(row => {
              if (row.canSelect) {
                return row.toggleRowSelected(
                  !instance.rows.filter(r => r.canSelect).every(r => r.isSelected),
                );
              }
              return false;
            });
          },
          checked: instance.rows.filter(row => row.canSelect).every(row => row.isSelected),
          indeterminate: Boolean(
            !instance.isAllRowsSelected && Object.keys(instance.state.selectedRowIds).length,
          ),
        },
      ];
    },
  ];
  hooks.allColumns.push(columns => [
    {
      id: '_selector',
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 40,
      width: 40,
      maxWidth: 40,
      Aggregated: undefined,
      className: 'selector',
      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
        <Checkbox {...getToggleAllRowsSelectedProps()} />
      ),
      Cell: ({ row }: CellProps<any>) => {
        const disabled = !row.canSelect;

        return (
          <Checkbox
            {...row.getToggleRowSelectedProps()}
            disabled={disabled}
            style={disabled ? { cursor: 'not-allowed' } : undefined}
          />
        );
      },
    },
    ...columns,
  ]);
};

const hooks = [useFilters, useSortBy, usePagination, useRowSelect];
const withSelectionHooks = [...hooks, selectionHook];

function DataTableComponent<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProps<T>>,
  ref: React.Ref<unknown> | undefined,
): ReactElement {
  const {
    columns,
    // data = [],
    manualSortBy = true,
    manualFilters = true,
    showFooter = true,
    showToolbar = true,
    simpleSearch = false,
    batchActions,
    toolbarLeft,
    toolbarRight,
    rowKey,
    placeholder,
    selectType = 'checkbox',
    url,
    emptyPlaceholder,
    tableName,
    useStorageState,
    disableRowSelect,
  } = props;
  const [, setStorageState] = useLocalStorage({ key: `tableState:${tableName}` });
  const initialState = getInitialState(tableName, useStorageState);

  const [{ pageIndex, pageSize, totalCount, filters, sortBy }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const {
    isLoading,
    isSuccess,
    isFetching,
    data: serverData,
    refetch,
  } = useData(
    url || '',
    {
      pageIndex,
      pageSize,
      filters,
      sortBy,
    },
    tableName,
  );

  const { formatColumns, suggestions } = useMemo(() => {
    return prepareColumns<T>(columns);
  }, []);

  const getRowId = (row: any, relativeIndex: number) => {
    return get(row, rowKey) || String(relativeIndex);
  };

  const memoData = useMemo(() => serverData?.items || [], [serverData]);
  const tableHooks = selectType ? withSelectionHooks : hooks;

  const instance = useTable(
    {
      columns: formatColumns,
      data: memoData,
      manualSortBy,
      manualFilters,
      manualPagination: true,
      getRowId,
      pageCount: isSuccess ? Math.ceil(totalCount / pageSize) : 1,
      // @ts-ignore
      initialState,
      disableRowSelect,
    },
    ...tableHooks,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    // selectedFlatRows,
  } = instance;
  const [debouncedState] = useDebouncedValue(state, 500);

  const clearAndRefetch = () => {
    instance.setAllFilters([]);
  };

  useEffect(() => {
    setStorageState(JSON.stringify(debouncedState));
  }, [setStorageState, debouncedState]);

  useEffect(() => {
    dispatch({ type: PAGE_CHANGED, payload: state.pageIndex });
  }, [state.pageIndex]);

  useDidUpdate(() => {
    instance.gotoPage(0);
    dispatch({ type: SORTBY_CHANGED, payload: state.sortBy });
  }, [state.sortBy]);

  useDidUpdate(() => {
    instance.gotoPage(0);
    dispatch({ type: FILTER_CHANGED, payload: state.filters });
  }, [state.filters]);

  useEffect(() => {
    dispatch({ type: TOTAL_COUNT_CHANGED, payload: serverData?.totalItems });
  }, [serverData?.totalItems]);

  const tableRef = useRef();

  useImperativeHandle(ref, () => ({
    refetch: () => {
      refetch();
    },
  }));

  return (
    <TableWrapper padding={0} ref={tableRef}>
      {showToolbar && (
        <Toolbar
          instance={instance}
          batchActions={batchActions}
          toolbarLeft={toolbarLeft}
          toolbarRight={toolbarRight}
          simpleSearch={simpleSearch}
          placeholder={placeholder}
          suggestions={suggestions}
          refetch={refetch}
        />
      )}
      <TableMain>
        <Table {...getTableProps()}>
          {headerGroups.map(headerGroup => {
            return (
              <colgroup key={`colgroup-${headerGroup.getHeaderGroupProps().key}`}>
                {headerGroup.headers.map(column => {
                  const { key: headerKey } = column.getHeaderProps();
                  if (column.width) return <col width={column.width} key={`col-${headerKey}`} />;
                  return <col key={`col-${headerKey}`} />;
                })}
              </colgroup>
            );
          })}
          <thead>
            {headerGroups.map(headerGroup => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => {
                    const { key: headerKey } = column.getHeaderProps();
                    return <TableHead column={column} key={headerKey} selectType={selectType} />;
                  })}
                </tr>
              );
            })}
          </thead>
          <TBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              if (disableRowSelect) {
                row.canSelect = !disableRowSelect(row.original);
              } else {
                row.canSelect = true;
              }
              return (
                <tr {...row.getRowProps()} className={cx({ 'row-selected': row.isSelected })}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={cx({ 'table-selector': cell.column.id === '_selector' })}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </TBody>
        </Table>
      </TableMain>
      {(isLoading || totalCount === 0) && (
        <>
          {emptyPlaceholder || <TableEmpty clearAndRefetch={clearAndRefetch} refetch={refetch} />}
        </>
      )}
      {showFooter && <TableFooter<T> instance={instance} totalCount={totalCount} />}
      <LoadingOverlay visible={isFetching} />
    </TableWrapper>
  );
}

export const DataTable = forwardRef(DataTableComponent);
