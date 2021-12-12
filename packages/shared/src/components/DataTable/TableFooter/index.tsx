import React, { PropsWithChildren, ReactElement } from 'react';
import { TableInstance } from 'react-table';
import styled from 'styled-components';
import { Button } from '@kubed/components';
import { Previous, Next } from '@kubed/icons';

const FooterWrapper = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: #f9fbfd;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #79879c;
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .pagination {
    display: inline-flex;
    align-items: center;

    button {
      padding: 5px 12px;
      &:disabled {
        opacity: 0.6;
        border-color: transparent;
        background-color: transparent;
      }
    }
  }
`;

interface TableFooterProps<T extends Record<string, unknown>> {
  instance: TableInstance<T>;
  totalCount: number;
}

export function TableFooter<T extends Record<string, unknown>>({
  instance,
  totalCount,
}: PropsWithChildren<TableFooterProps<T>>): ReactElement {
  const {
    state: { pageIndex },
    // gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    pageCount,
  } = instance;

  return (
    <FooterWrapper>
      <FooterInner>
        <div className="total-count">总数：{totalCount}</div>
        <div className="pagination">
          <Button variant="text" radius="sm" onClick={previousPage} disabled={pageIndex === 0}>
            <Previous size={20} />
          </Button>
          <span style={{ margin: '0 12px' }}>
            {pageIndex + 1} / {pageCount}
          </span>
          <Button variant="text" radius="sm" onClick={nextPage} disabled={pageIndex === pageCount}>
            <Next size={20} />
          </Button>
        </div>
      </FooterInner>
    </FooterWrapper>
  );
}
