import React, { PropsWithChildren } from 'react';
import { HeaderGroup } from 'react-table';
import styled from 'styled-components';
import cx from 'classnames';
import { Popover, Menu, MenuItem, MenuLabel, Dropdown } from '@kubed/components';
import { Information, CaretDown, SortAscending, SortDescending } from '@kubed/icons';

const TWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .sort-indicator {
    color: ${({ theme }) => theme.palette.accents_5};
  }

  .kubed-icon {
    margin-left: 4px;
  }

  .filter-menu {
    .menu-label {
      color: ${({ theme }) => theme.palette.accents_5};
    }
    button {
      color: #4a5974;
    }

    .kubed-icon {
      color: ${({ theme }) => theme.palette.accents_5};
      fill: #b6c2cd;
    }
  }
`;

const DropdownWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export interface TableHeadProps<T extends Record<string, unknown>> {
  column: HeaderGroup<T>;
}

function TableHead<T extends Record<string, unknown>>({
  column,
}: PropsWithChildren<TableHeadProps<T>>) {
  // @ts-ignore
  const { description, sortable, filterOptions = [], toggleSortBy, setFilter } = column;

  const handleSort = (direction: 'ascending' | 'descending') => {
    toggleSortBy(direction === 'descending');
  };

  const handleFilter = (value: any) => {
    setFilter(value);
  };

  const renderDropdown = () => {
    // todo add sort state isSorted, isSortedDesc from column;
    if (sortable || filterOptions.length) {
      const content = (
        <Menu className="filter-menu">
          {sortable && (
            <>
              <MenuLabel>排序</MenuLabel>
              <MenuItem
                icon={<SortAscending />}
                onClick={() => {
                  handleSort('ascending');
                }}
              >
                升序
              </MenuItem>
              <MenuItem
                icon={<SortDescending />}
                onClick={() => {
                  handleSort('descending');
                }}
              >
                降序
              </MenuItem>
            </>
          )}
          {filterOptions.length && (
            <>
              <MenuLabel>过滤</MenuLabel>
              {filterOptions.map((option: any) => (
                <MenuItem
                  key={option.key}
                  onClick={() => {
                    handleFilter(option.key);
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </>
          )}
        </Menu>
      );

      return (
        <Dropdown content={content}>
          <DropdownWrapper>
            {column.render('Header')}
            <CaretDown className="sort-indicator" />
          </DropdownWrapper>
        </Dropdown>
      );
    }

    return <>{column.render('Header')}</>;
  };

  return (
    <th
      {...column.getHeaderProps()}
      className={cx({ 'table-selector': column.id === '_selector' })}
    >
      <TWrapper>
        {renderDropdown()}
        {description && (
          <Popover {...description}>
            <Information />
          </Popover>
        )}
      </TWrapper>
    </th>
  );
}

export default TableHead;
