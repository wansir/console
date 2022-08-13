import React from 'react';
import { get } from 'lodash';
import { Navigate } from 'react-router-dom';

import Mail from '../containers/NotificationConfiguration/Mail';
import Slack from '../containers/NotificationConfiguration/Slack';
import FeiShu from '../containers/NotificationConfiguration/FeiShu';
import WeCom from '../containers/NotificationConfiguration/WeCom';
import DingTalk from '../containers/NotificationConfiguration/DingTalk';
import Webhook from '../containers/NotificationConfiguration/Webhook';

import type { NavItem } from '../types';
import { getNotificationConfigurationTabs } from '../utils/navs';

const tabs: NavItem[] = getNotificationConfigurationTabs();
const indexRoutePath = get(tabs, '[0].name', '/404');

export default [
  {
    index: true,
    element: <Navigate to={indexRoutePath} replace />,
  },
  {
    path: 'mail',
    element: <Mail />,
  },
  {
    path: 'slack',
    element: <Slack />,
  },
  {
    path: 'feishu',
    element: <FeiShu />,
  },
  {
    path: 'dingtalk',
    element: <DingTalk />,
  },
  {
    path: 'wecom',
    element: <WeCom />,
  },
  {
    path: 'webhook',
    element: <Webhook />,
  },
];
