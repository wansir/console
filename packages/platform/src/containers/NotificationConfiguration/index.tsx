import React from 'react';
import { isEmpty } from 'lodash';
import { Bell } from '@kubed/icons';
import styled from 'styled-components';
import { Banner, Navs, Card } from '@kubed/components';
import { Outlet, useNavigate } from 'react-router-dom';

import type { LabelValue, NavItem } from '../../types';
import { NOTIFICATION_CONF_NAV_LOCALS_MAP } from '../../constants';
import { getNotificationConfigurationTabs } from '../../utils/navs';

const PageHeader = styled.div`
  margin-bottom: 12px;
`;

function NotificationConfiguration(): JSX.Element {
  const navigate = useNavigate();
  const tabs: NavItem[] = getNotificationConfigurationTabs();
  const navs: Array<LabelValue> = tabs.map((item: any) => ({
    label: t(NOTIFICATION_CONF_NAV_LOCALS_MAP[item.name]),
    value: item.name,
  }));

  function handleNavsChange(navKey: string): void {
    navigate(`/settings/notification-configuration/${navKey}`);
  }

  return (
    <>
      <PageHeader>
        <Banner
          icon={<Bell />}
          className="mb12"
          title={t('NOTIFICATION_CONFIGURATION')}
          description={t('NOTIFICATION_CONFIGURATION_DESC')}
        />
        {!isEmpty(navs) && <Navs onChange={handleNavsChange} data={navs} />}
      </PageHeader>
      <Card>
        <Outlet />
      </Card>
    </>
  );
}

export default NotificationConfiguration;
