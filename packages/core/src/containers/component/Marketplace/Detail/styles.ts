import styled from 'styled-components';

export const HeaderInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 130px;

  .field-avatar {
    background-color: #eff4f9;
    border-radius: 4px;
    margin-right: 20px;
    width: 48px;
    height: 48px;
  }

  .field-value,
  .field-label {
    color: #fff;
  }

  .field-value {
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgb(36 46 66 / 10%);
    margin-bottom: 8px;
  }

  .back {
    a {
      color: #fff;
    }
  }
`;

export const TabBar = styled.div`
  background-color: #eff4f9;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1280px;
`;

export const TabContainer = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Tabs = styled.div`
  display: inline-flex;
`;

export const Tab = styled.div`
  padding: 16px 12px;
  min-width: 120px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;

  &.is-active {
    background-color: #fff;
    color: #55bc8a;
  }

  &:hover {
    color: #55bc8a;
  }
`;

export const Section = styled.div`
  margin-bottom: 30px;

  .section-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 12px;
  }

  .version-table {
    width: 100%;
    border: 1px solid #ccd3db;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: left;

    th {
      color: #79879c;
    }

    th,
    td {
      padding: 12px 10px;
      font-size: 12px;
      line-height: 20px;
      text-align: left;
      border-right: 1px solid #d1d7df;
      border-bottom: 1px solid #d1d7df;
      vertical-align: middle;

      &:first-child {
        width: 25%;
      }
    }
  }
`;
