import styled from 'styled-components';

export const MarketWrapper = styled.div`
  margin-top: -68px;

  &.is-white {
    min-height: 100vh;
    background: #fff;
  }
`;

export const MarketHeader = styled.div`
  position: relative;
  background-color: #181d28;
  z-index: 10;
  height: auto;
  padding-top: 92px;
`;

export const MarketHeaderInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;
  margin: 0 auto;
  padding: 0 24px;

  .components-search {
    margin-top: 40px;
    margin-bottom: 56px;
    width: 526px;
    height: 40px;
    display: flex;
    align-items: center;

    & > .icon-search {
      width: 20px;
      height: 20px;
    }
    & > div {
      width: 100%;
    }
  }
`;

export const TitleWrapper = styled.div`
  font-weight: 600;
  font-size: 36px;
  line-height: 56px;
  color: #fff;
  margin-bottom: 8px;
`;

export const Description = styled.div`
  width: 700px;
  font-size: 14px;
  color: #fff;
`;

export const MainContent = styled.div`
  width: 1258px;
  margin: 0 auto;
  padding: 36px 24px 0;
  display: flex;
  position: relative;
  min-height: calc(100vh - 315px);
`;

export const ComponentSection = styled.div`
  position: relative;
  margin-left: 20px;
  flex-grow: 1;

  .section-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #242e42;
  }
`;

export const ComponentList = styled.div`
  .component-item {
    width: calc(33.3% - 14px);
    margin-bottom: 20px;
    margin-right: 20px;
    display: inline-flex;
    flex-direction: column;
    cursor: pointer;
    padding: 24px;
    border: 1px solid transparent;
    transition: all ease-in-out 0.3s;
    box-shadow: 0 4px 8px 0 rgb(36 46 66 / 6%);
    background-color: #fff;
    border-radius: 4px;

    &:hover {
      transform: translateY(-4px);
      border-color: #79879c;
      box-shadow: 0 4px 8px 0 rgb(36 46 66 / 20%);

      .field-value {
        color: inherit;
      }
    }

    &:nth-of-type(3n + 3) {
      margin-right: 0;
    }

    .component-title {
      width: 100%;
      height: 60px;
    }

    .field-avatar {
      width: 48px;
      height: 48px;
      min-width: 48px;
      margin-right: 32px;
      img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
    }

    .field-label {
      white-space: initial;
      word-wrap: initial;
    }

    .component-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 18px;

      .version {
        color: #79879c;
      }
    }

    .install-status {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: #f9fbfd;
      border-radius: 16px;
      //width: 80px;
      height: 32px;
      padding: 6px 12px;
      font-weight: 600;

      .kubed-icon {
        margin-right: 5px;
      }

      .icon-installed {
        background-color: #55bc8a;
        border-radius: 50%;
      }
    }
  }
`;

export const Categories = styled.div`
  position: sticky;
  top: 80px;
  width: 193px;
  height: 100%;

  .section-title {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  .cate-list {
    margin-top: 12px;
    margin-left: 12px;
  }

  .cate-link {
    display: flex;
    margin-bottom: 12px;

    &.is-active {
      font-weight: 500;
      color: #55bc8a;
    }

    .kubed-icon {
      margin-right: 12px;
    }
  }
`;
