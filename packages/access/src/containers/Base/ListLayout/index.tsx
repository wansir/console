import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Key } from '@kubed/icons';
import { NavTitle, NavMenu, useGlobalStore } from '@ks-console/shared';

import { getAccessNavs } from '../../../utils/navs';

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

const navKey = 'ACCESS_NAVS';

function ListLayout() {
  const location = useLocation();
  const { getNav, setNav } = useGlobalStore();
  let navs = getNav(navKey);

  useEffect(() => {
    if (!navs) {
      navs = getAccessNavs();
      setNav(navKey, navs);
    }
  }, []);

  return (
    <>
      <PageSide>
        <NavTitle
          icon={<Key variant="light" size={40} />}
          title={t('ACCESS_CONTROL')}
          subtitle={t('PLATFORM_LEVEL_ACCESS_CONTROL')}
          style={{ marginBottom: '20px' }}
        />
        <NavMenu navs={navs} prefix="." pathname={location.pathname} />
      </PageSide>
      <PageMain>
        <Outlet />
      </PageMain>
    </>
  );
}

export default ListLayout;
