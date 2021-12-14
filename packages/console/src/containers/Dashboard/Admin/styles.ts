import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  .fields-card {
    display: flex;
    flex-direction: row;

    & > * {
      flex-grow: unset;
      width: 120px;
      margin-right: 9px;
    }

    a:hover {
      .field-label,
      .field-value {
        color: #55bc8a;
      }
    }
  }

  .stat-card {
    padding: 0 0 12px;
    a:hover {
      .field-label,
      .field-value {
        color: #55bc8a;
      }

      .kubed-icon {
        color: #00aa72;
        fill: #90e0c5;
      }
    }
  }
`;

export const StatTitle = styled.div`
  padding: 12px;
`;

export const StatItem = styled.div`
  padding: 8px 12px;
  box-shadow: 0 1px 0 0 #d8dee5, 0 -1px 0 0 #d8dee5;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const EmptyHistory = styled.div`
  padding: 12px;
  border-radius: 3px;
  border: 1px dashed ${({ theme }) => theme.palette.border};
  background-color: #fff;
`;
