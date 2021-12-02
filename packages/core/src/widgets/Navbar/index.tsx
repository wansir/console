import React from 'react';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu, MenuItem } from '@kubed/components';
import { Dashboard, Cogwheel, Appcenter, Documentation, Hammer, Api } from '@kubed/icons';
import { checker } from '@ks-console/shared';

import { NavbarWrapper, NavbarBottom, NavbarLeft, LogoWrapper, NavbarRight } from './styles';
import ProfileMenu from './ProfileMenu';

const { isAppsPage: getIsAppsPage } = checker;

const Navbar = () => {
  const logo = globals.config.logo || '/assets/logo.svg';
  const isLogin = !!globals.user;
  // const { enableGlobalNav, enableAppStore } = globals.app;
  const enableGlobalNav = true; // todo, mock
  const enableAppStore = true;
  const isAppsPage = getIsAppsPage();
  const { url, api } = globals.config.documents;

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
    <NavbarWrapper className={cls({ 'is-dark': isAppsPage })}>
      <NavbarLeft>
        {isLogin && (
          <>
            {enableGlobalNav && (
              <Button variant="text" className="global-nav" leftIcon={<Cogwheel />}>
                {t('Platform')}
              </Button>
            )}
            {enableAppStore && (
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
    </NavbarWrapper>
  );
};

export default Navbar;
