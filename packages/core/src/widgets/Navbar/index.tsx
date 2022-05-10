import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { cloneDeep } from 'lodash';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu, MenuItem } from '@kubed/components';
import { Dashboard, Cogwheel, Appcenter, Documentation, Hammer, Api } from '@kubed/icons';
import {
  useGlobalStore,
  checker,
  checkNavItem,
  enableAppStore,
  hasPermission,
} from '@ks-console/shared';

import { NavbarWrapper, NavbarBottom, NavbarLeft, LogoWrapper, NavbarRight } from './styles';
import ProfileMenu from './ProfileMenu';
import GlobalNav from './GlobalNav';

const { isAppsPage: getIsAppsPage, isDarkHeader: getIsDarkHeader } = checker;

const platformNavKey = 'GLOBAL_NAV';
const getGlobalNavs = () => {
  const navs: string[] = [];
  cloneDeep(globals.config.globalNavs.children).forEach((nav: any) => {
    if (checkNavItem(nav, params => hasPermission(params))) {
      navs.push(nav);
    }
  });
  return navs;
};

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const logo = globals.config.logo || '/assets/logo.svg';
  const isLogin = !!globals.user;
  const isAppsPage = getIsAppsPage();
  const isDarkHeader = getIsDarkHeader();
  const { url, api } = globals.config.documents;

  const { getNav, setNav, setNavOpen } = useGlobalStore();
  let navs = getNav(platformNavKey);
  useEffect(() => {
    if (!navs) {
      navs = getGlobalNavs();
      setNav(platformNavKey, navs);
    }

    const scrollHandler = () => setIsScroll(document.documentElement.scrollTop > 10);
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);
  const enableGlobalNav = navs?.length > 0;

  const docMenu = (
    <Menu>
      <MenuItem icon={<Hammer />} as="a" href={url} target="_blank">
        {t('User Manual')}
      </MenuItem>
      <MenuItem icon={<Api />} as="a" href={api} target="_blank">
        {t('API Documents')}
      </MenuItem>
    </Menu>
  );

  const topbarNavs = globals.config.topbarNavs.children;

  return (
    <NavbarWrapper className={cx({ 'is-dark': isDarkHeader, 'is-scroll': isScroll })}>
      <NavbarLeft>
        {isLogin && (
          <>
            {topbarNavs.map((nav: any) => {
              if (nav.name === 'platform') {
                return (
                  enableGlobalNav && (
                    <Button
                      key={nav.name}
                      variant="text"
                      className="global-nav"
                      leftIcon={<Cogwheel />}
                      onClick={() => {
                        setNavOpen(true);
                      }}
                    >
                      {t('Platform')}
                    </Button>
                  )
                );
              }
              if (nav.name === 'app_store') {
                return (
                  enableAppStore() && (
                    <Button
                      key={nav.name}
                      variant="text"
                      as={Link}
                      className="global-nav"
                      to="/apps"
                      leftIcon={<Appcenter />}
                    >
                      {t('APP_STORE')}
                    </Button>
                  )
                );
              }
              if (nav.name === 'workbench') {
                return (
                  <Button
                    key={nav.name}
                    variant="text"
                    as={Link}
                    className="global-nav"
                    to="/"
                    leftIcon={<Dashboard />}
                  >
                    {t('Workbench')}
                  </Button>
                );
              }
              return (
                <Button
                  key={nav.name}
                  variant="text"
                  as={Link}
                  className="global-nav"
                  to={nav.name}
                  leftIcon={<Dashboard />}
                >
                  {t(nav.title)}
                </Button>
              );
            })}
          </>
        )}
      </NavbarLeft>
      <LogoWrapper>
        <Link to={isAppsPage && !isLogin ? '/apps' : '/'} className="logo">
          <img src={isDarkHeader ? '/assets/login-logo.svg' : logo} alt="" />
        </Link>
      </LogoWrapper>
      <NavbarRight>
        {isLogin && (
          <Dropdown content={docMenu}>
            <Button variant="text">
              <Documentation />
            </Button>
          </Dropdown>
        )}
        <ProfileMenu isLogin={isLogin} />
      </NavbarRight>
      {isDarkHeader ? null : <NavbarBottom />}
      {enableGlobalNav && <GlobalNav navs={navs} />}
    </NavbarWrapper>
  );
};

export default Navbar;
