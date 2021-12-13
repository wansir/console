import React, { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';
import { Empty, themeUtils } from '@kubed/components';

const EmptyWrapper = styled.div`
  margin: 16px 0;

  span {
    color: ${({ theme }) => themeUtils.getColor('blue', theme)};
    padding: 0 4px;
    cursor: pointer;
    font-weight: 600;
  }
`;

interface EmptyProps {
  clearAndRefetch: any;
  refetch: any;
}

export function TableEmpty({
  clearAndRefetch,
  refetch,
}: PropsWithChildren<EmptyProps>): ReactElement {
  const description = (
    <>
      {t('You can try to')}
      <span onClick={refetch}>{t('refresh data')}</span>
      {t('or')}
      <span onClick={clearAndRefetch}>{t('clear search conditions')}</span>
    </>
  );
  return (
    <EmptyWrapper>
      <Empty title={t('NO_MATCHING_RESULT_FOUND')} description={description} />
    </EmptyWrapper>
  );
}
