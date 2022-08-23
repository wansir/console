import React, { useState } from 'react';
import { trimEnd } from 'lodash';
import { Wrapper, InnerWrapper } from './NavMenu.styles';
import NavItem from './NavItem';

const getOpenedNav = (navs: any, current: string) => {
  let name = '';
  navs.forEach((nav: any) => {
    nav.children.forEach((item: any) => {
      if (
        item.children &&
        item.children.some((child: any) => {
          if (child.name === current) {
            return true;
          }
          if (child.tabs) {
            return child.tabs.some((tab: any) => tab.name === current);
          }

          return false;
        })
      ) {
        name = item.name;
      }
    });
  });

  return name;
};

const getCurrentPath = (path: string) => {
  const trimPath = trimEnd(path, '/');
  const pathArr = trimPath.split('/');
  return pathArr[pathArr.length - 1];
};

interface NavMenuProps {
  navs: any;
  prefix: string;
  disabled?: boolean;
  pathname: string;
}

const NavMenu = ({ navs, prefix, disabled, pathname }: NavMenuProps) => {
  if (!navs || navs.length === 0) return null;
  const current = getCurrentPath(pathname);
  const [openedNav, setOpenedNav] = useState(getOpenedNav(navs, current));

  const handleToggleItem = (itemName: string) => {
    const newOpenedNav = openedNav === itemName ? '' : itemName;
    setOpenedNav(newOpenedNav);
  };

  return (
    <Wrapper>
      {navs.map((nav: any) => (
        <InnerWrapper key={nav.name}>
          {nav.title && <p>{t(nav.title)}</p>}
          <ul>
            {nav.children.map((item: any) => (
              <NavItem
                key={item.name}
                item={item}
                prefix={prefix}
                onOpen={handleToggleItem}
                isOpen={item.name === openedNav}
                current={current}
                disabled={disabled}
              />
            ))}
          </ul>
        </InnerWrapper>
      ))}
    </Wrapper>
  );
};

export default NavMenu;
