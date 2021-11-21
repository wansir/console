import React from 'react';
import { Human, CaretDown, Wrench, Logout, Information } from '@kubed/icons';
import { Dropdown, Menu, MenuItem } from '@kubed/components';

import { LoginWrapper, NotLogin } from './styles';

interface ProfileMenuProps {
  isLogin: boolean;
  isAppsPage: boolean;
}

const ProfileMenu = ({ isLogin, isAppsPage }: ProfileMenuProps) => {
  if (!isLogin) {
    return (
      <NotLogin>
        <Human className="icon-human" />
        <a href={`/login?referer=${location.pathname}`}>{t('Log in KubeSphere')}</a>
      </NotLogin>
    );
  }

  const userMenu = (
    <Menu>
      <MenuItem icon={<Wrench />}>{t('USER_SETTINGS')}</MenuItem>
      <MenuItem icon={<Logout />}>{t('LOG_OUT')}</MenuItem>
      <MenuItem icon={<Information />}>{t('ABOUT')}</MenuItem>
    </Menu>
  );

  return (
    <Dropdown content={userMenu} placement="bottom-start">
      <LoginWrapper>
        <Human />
        <span className="username">{globals.user.username}</span>
        <CaretDown />
      </LoginWrapper>
    </Dropdown>
  );
};

export default ProfileMenu;
