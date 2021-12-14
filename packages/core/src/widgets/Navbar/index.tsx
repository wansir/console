import React, { useEffect } from 'react';
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

const { isAppsPage: getIsAppsPage } = checker;

const navKey = 'GLOBAL_NAV';
const getGlobalNavs = () => {
  const navs: string[] = [];
  cloneDeep(globals.config.globalNavs).forEach((nav: any) => {
    if (checkNavItem(nav, params => hasPermission(params))) {
      navs.push(nav);
    }
  });
  return navs;
};

const Navbar = () => {
  const logo = globals.config.logo || '/assets/logo.svg';
  const isLogin = !!globals.user;
  const isAppsPage = getIsAppsPage();
  const { url, api } = globals.config.documents;

  const { getNav, setNav, setNavOpen } = useGlobalStore();
  let navs = getNav(navKey);
  useEffect(() => {
    if (!navs) {
      navs = getGlobalNavs();
      setNav(navKey, navs);
    }
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

  return (
    <NavbarWrapper className={cx({ 'is-dark': isAppsPage })}>
      <NavbarLeft>
        {isLogin && (
          <>
            {enableGlobalNav && (
              <Button
                variant="text"
                className="global-nav"
                leftIcon={<Cogwheel />}
                onClick={() => {
                  setNavOpen(true);
                }}
              >
                {t('Platform')}
              </Button>
            )}
            {enableAppStore() && (
              <Button
                variant="text"
                as={Link}
                className="global-nav"
                to="/apps"
                leftIcon={<Appcenter />}
              >
                {t('APP_STORE')}
              </Button>
            )}
            <Button variant="text" as={Link} className="global-nav" to="/" leftIcon={<Dashboard />}>
              {t('Workbench')}
            </Button>
          </>
        )}
      </NavbarLeft>
      <LogoWrapper>
        <Link to={isAppsPage && !isLogin ? '/apps' : '/'} className="logo">
          <img src={logo} alt="" />
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
        <ProfileMenu isAppsPage={isAppsPage} isLogin={isLogin} />
      </NavbarRight>
      <NavbarBottom />
      {enableGlobalNav && <GlobalNav navs={navs} />}
    </NavbarWrapper>
  );
};

export default Navbar;
