import styled from 'styled-components';

export const NotLogin = styled.div`
  display: flex;
  align-items: center;

  .icon-human {
    color: ${({ theme }) => theme.palette.warning};
    fill: ${({ theme }) => theme.palette.colors.yellow[4]};
  }

  a {
    margin-left: 12px;
    color: ${({ theme }) => theme.palette.warning};
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 31px;
  cursor: pointer;

  .username {
    margin: 0 12px;
  }
`;
