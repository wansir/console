import React from 'react';
import { get } from 'lodash';
import { Navigate } from 'react-router-dom';

import Mail from '../containers/Mail';
import BaseInfo from '../containers/BaseInfo';
import { getPlatformSettingsNavs } from '../utils/navs';
import SettingsLayout from '../containers/SettingsLayout';

const navs = getPlatformSettingsNavs();
const indexRoutePath = get(navs, '[0].items[0].name');

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
        path: 'mail',
        element: <Mail />,
      },
      {
        path: 'notification-configuration',
        element: <Navigate to="/settings/mail" replace />,
      },
    ],
  },
];
