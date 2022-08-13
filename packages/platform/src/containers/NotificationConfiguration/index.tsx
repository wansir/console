import React from 'react';
import { Home } from '@kubed/icons';
import { Banner, Navs } from '@kubed/components';
import { Outlet, useNavigate } from 'react-router-dom';

import type { NavType } from './type';
import { getNotificationConfigurationTabs } from '../../utils/navs';

const NOTIFICATION_CONF_NAV_LOCALS_MAP: Record<string, any> = {
  mail: 'NOTIFICATION_EMAIL',
  feishu: 'Feishu',
  dingtalk: 'DingTalk',
  wecom: 'WeCom',
  slack: 'Slack',
  webhook: 'Webhook',
};

function NotificationConfiguration(): JSX.Element {
  const navigate = useNavigate();
  const tabs = getNotificationConfigurationTabs();
  const navs: NavType = tabs.map(item => ({
    label: t(NOTIFICATION_CONF_NAV_LOCALS_MAP[item.name]),
    value: item.name,
  }));

  function handleNavsChange(navKey: string): void {
    navigate(`/settings/notification-configuration/${navKey}`);
  }

  return (
    <>
      <Banner
        icon={<Home />}
        className="mb12"
        title={t('NOTIFICATION_CONFIGURATION')}
        description={t('NOTIFICATION_CONFIGURATION_DESC')}
      />
      <Navs style={{ marginBottom: '12px' }} onChange={handleNavsChange} data={navs} />
      <Outlet />
    </>
  );
}

export default NotificationConfiguration;
