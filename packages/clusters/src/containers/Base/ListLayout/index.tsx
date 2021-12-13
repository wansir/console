import React from 'react';
import { Outlet, useParams, useLocation, useMatch, useResolvedPath } from 'react-router-dom';
import { get, cloneDeep, isEmpty } from 'lodash';
import styled from 'styled-components';
import { Cluster } from '@kubed/icons';
import {
  NavTitle,
  NavMenu,
  checkNavItem,
  hasPermission,
  checkClusterVersionRequired,
} from '@ks-console/shared';
import { useStore } from '@kubed/stook';

const PageSide = styled.div`
  position: fixed;
  top: 88px;
  padding: 0 20px 40px;
  width: 260px;
  z-index: 201;
`;

const PageMain = styled.div`
  margin-left: 240px;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const getClusterNavs = (cluster?: string) => {
  if (!cluster || !get(globals.user, `clusterRules[${cluster}]`)) {
    return [];
  }

  const navs: string[] = [];
  cloneDeep(globals.config.clusterNavs).forEach((nav: any) => {
    const filteredItems = nav.items.filter((item: any) => {
      item.cluster = cluster;
      return checkNavItem(item, params => hasPermission({ ...params, cluster }));
    });
    if (!isEmpty(filteredItems)) {
      checkClusterVersionRequired(filteredItems, cluster);
      navs.push({ ...nav, items: filteredItems });
    }
  });
  return navs;
};

const ListLayout = () => {
  const { cluster: clusterName } = useParams();
  const location = useLocation();
  console.log('location', location);
  const match = useResolvedPath(location);
  const [cluster] = useStore('cluster');
  const navs = getClusterNavs(clusterName);
  console.log('navs', navs, match);
  return (
    <>
      <PageSide>
        <NavTitle
          icon={<Cluster variant="light" size={40} />}
          title={cluster.name}
          subtitle={t('CLUSTER')}
          style={{ marginBottom: '20px' }}
        />
        <NavMenu
          navs={navs}
          disabled={!cluster.isReady}
          prefix={`/clusters/${clusterName}`}
          pathname={location.pathname}
        />
      </PageSide>
      <PageMain>
        <Outlet />
      </PageMain>
    </>
  );
};

export default ListLayout;
