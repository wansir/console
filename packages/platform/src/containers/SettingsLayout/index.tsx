import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Cogwheel } from '@kubed/icons';
import { Outlet, useLocation } from 'react-router-dom';
import { NavTitle, NavMenu, useGlobalStore } from '@ks-console/shared';

import { NAV_KEY } from '../../constants';
import { getPlatformSettingsNavs } from '../../utils/navs';

const PageSide = styled.div`
  position: fixed;
  top: 88px;
  padding: 0 20px 40px;
  width: 260px;
  z-index: 99;
`;

const PageMain = styled.div`
  margin-left: 240px;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

function PlatformSettingsLayout(): JSX.Element {
  const location = useLocation();
  const { getNav, setNav } = useGlobalStore();
  let navs = getNav(NAV_KEY);

  useEffect(() => {
    if (!navs) {
      navs = getPlatformSettingsNavs();
      setNav(NAV_KEY, navs);
    }
  }, []);

  return (
    <>
      <PageSide>
        <NavTitle
          icon={<Cogwheel variant="light" size={40} />}
          title={t('PLATFORM_SETTINGS')}
          subtitle={t('PLATFORM_SETTINGS_SELECTOR_DESC')}
          style={{ marginBottom: '20px' }}
        />
        <NavMenu navs={navs} prefix={'/settings'} pathname={location.pathname} />
      </PageSide>
      <PageMain>
        <Outlet />
      </PageMain>
    </>
  );
}

export default PlatformSettingsLayout;
