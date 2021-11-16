import styled from 'styled-components';

export const PasswordTipWrapper = styled.div`
  margin-top: 12px;
`;

export const TipInner = styled.div`
  margin-top: 5px;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_1};
`;

export const TipItem = styled.div`
  display: flex;
  align-items: center;

  .kubed-icon {
    margin-right: 8px;
  }
`;
