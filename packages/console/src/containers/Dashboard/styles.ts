import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  max-width: 1400px;
  padding: 20px;
  min-height: calc(100vh - 108px);
  margin: 0 auto;
`;

export const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0 40px;
`;

export const UserAvatar = styled.div`
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-right: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const WelcomeWrapper = styled.div`
  overflow: hidden;

  strong {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
  }
`;

export const LoginInfo = styled.div`
  display: flex;
  align-items: center;

  p {
    display: flex;
    align-items: center;
    line-height: 1.67;
    color: ${({ theme }) => theme.palette.accents_5};
    margin: 0 40px 0 0;
  }

  .kubed-icon {
    margin-right: 6px;
  }
`;
