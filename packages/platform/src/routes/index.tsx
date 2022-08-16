import React from 'react';
import { get } from 'lodash';
import { Navigate } from 'react-router-dom';

import BaseInfo from '../containers/BaseInfo';
import { getPlatformSettingsNavs } from '../utils/navs';
import SettingsLayout from '../containers/SettingsLayout';
import NotificationConfiguration from '../containers/NotificationConfiguration';
import NotificationConfigurationRoutes from './notification-configuration';

const navs = getPlatformSettingsNavs();
const indexRoutePath = get(navs, '[0].children[0].name', '/404');

export default [
  {
    path: '/settings',
    element: <SettingsLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={indexRoutePath} replace />,
      },
      {
        path: 'base-info',
        element: <BaseInfo />,
      },
      {
        path: 'notification-configuration',
        element: <NotificationConfiguration />,
        children: NotificationConfigurationRoutes,
      },
    ],
  },
];
