import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cx from 'classnames';
import { ChevronDown } from '@kubed/icons';
import { Icon } from '@ks-console/shared';
import { themeUtils } from '@kubed/components';

const ItemWrapper = styled.li`
  transition: all 0.2s ease-in-out;
  margin-bottom: 5px;

  &.is-open {
    .inner-nav {
      margin: 5px 0;
    }

    .inner-item {
      height: 20px;
      opacity: 1;
      transition: height 0.2s ease-in-out, margin-top 0.2s ease-in-out,
        opacity 0.2s ease-in-out 0.1s;

      &:not(:first-child) {
        margin-top: 8px;
      }
    }

    .open-indicator {
      transform: rotate(-180deg);
    }
  }

  &.is-select {
    color: #55bc8a;

    a {
      color: #55bc8a;
    }

    .title-wrapper {
      color: ${({ theme }) => themeUtils.getPrimaryColor(theme, true)};
    }

    .kubed-icon {
      color: #00aa72;
      fill: #90e0c5;
    }
  }

  .item-link {
    line-height: 20px;
    padding: 8px 12px;
    font-weight: 500;
    cursor: pointer;
    display: block;
    color: #4a5974;

    .kubed-icon {
      margin-right: 12px;
      margin-top: -1px;
      vertical-align: middle;
    }
  }
`;

const TitleWrapper = styled.div`
  position: relative;
  line-height: 20px;
  padding: 8px 12px;
  font-weight: 500;
  cursor: pointer;
  display: block;
  color: #4a5974;

  .open-indicator {
    position: absolute;
    right: 0;
    top: 12px;
    transition: all 0.2s ease-in-out;
  }

  .kubed-icon {
    margin-right: 12px;
    margin-top: -1px;
    vertical-align: middle;
  }
`;

const InnerNav = styled.ul`
  padding-left: 38px;
  transition: all 0.2s ease-in-out;
`;

const InnerItem = styled.li`
  transition: height 0.2s ease-in-out 0.1s, margin-top 0.2s ease-in-out 0.1s,
    opacity 0.2s ease-in-out;
  overflow: hidden;
  opacity: 0;
  height: 0;

  &.is-select {
    a {
      color: ${({ theme }) => themeUtils.getPrimaryColor(theme, true)};
    }
  }

  a {
    display: block;
  }
`;

interface NavItemProps {
  item?: any;
  onOpen: (params: any) => void;
  prefix: string;
  isOpen: boolean;
  current: string;
  disabled?: boolean;
}

const NavItem = ({ item, onOpen, isOpen, current, prefix }: NavItemProps) => {
  const handleToggle = () => {
    onOpen(item.name);
  };

  const checkSelect = (navItem: any = {}) => {
    if (navItem.children) {
      return navItem.children.some((child: any) => checkSelect(child));
    }

    if (navItem.tabs) {
      return navItem.tabs.some((tab: any) => checkSelect(tab));
    }

    return current.startsWith(navItem.name);
  };

  if (item.children) {
    return (
      <ItemWrapper className={cx({ 'is-open': isOpen, 'is-select': checkSelect(item) })}>
        <TitleWrapper onClick={handleToggle} className="title-wrapper">
          <Icon name={item.icon} />
          <span>{t(item.title)}</span>
          <ChevronDown className="open-indicator" />
        </TitleWrapper>
        <InnerNav className="inner-nav">
          {item.children.map((child: any) => {
            return (
              <InnerItem
                key={child.name}
                className={cx('inner-item', { 'is-select': checkSelect(child) })}
              >
                <Link to={`${prefix}/${child.name}`}>{t(child.title)}</Link>
              </InnerItem>
            );
          })}
        </InnerNav>
      </ItemWrapper>
    );
  }

  return (
    <ItemWrapper className={cx({ 'is-select': checkSelect(item) })}>
      <Link to={`${prefix}/${item.name}`} className="item-link">
        <Icon name={item.icon} />
        <span>{t(item.title)}</span>
      </Link>
    </ItemWrapper>
  );
};

export default NavItem;
