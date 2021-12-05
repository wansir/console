import React, { useState } from 'react';
import { Wrapper, InnerWrapper } from './NavMenu.styles';
import NavItem from './NavItem';
import menuData from './mockData';

const getOpenedNav = (navs: any) => {
  let name = '';
  const current = 'deployments';
  navs.forEach((nav: any) => {
    nav.items.forEach((item: any) => {
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

const NavMenu = () => {
  const navs: any = menuData.clusterNavs;
  const [openedNav, setOpenedNav] = useState(getOpenedNav(navs));

  const handleToggleItem = (itemName: string) => {
    const newOpenedNav = openedNav === itemName ? '' : itemName;
    setOpenedNav(newOpenedNav);
  };

  return (
    <Wrapper>
      {navs.map((nav: any) => (
        <InnerWrapper key={nav.cate}>
          {nav.title && <p>{t(nav.title)}</p>}
          <ul>
            {nav.items.map((item: any) => (
              <NavItem
                key={item.name}
                item={item}
                onOpen={handleToggleItem}
                isOpen={item.name === openedNav}
                current="deployments"
              />
            ))}
          </ul>
        </InnerWrapper>
      ))}
    </Wrapper>
  );
};

export default NavMenu;
