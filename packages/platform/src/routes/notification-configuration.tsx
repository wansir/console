import React from 'react';
import { get } from 'lodash';
import { Navigate } from 'react-router-dom';

import { getNotificationConfigurationTabs } from '../utils/navs';
import Mail from '../containers/NotificationConfiguration/Mail';

const tabs = getNotificationConfigurationTabs();
const indexRoutePath = get(tabs, '[0].name');

export default [
  {
    index: true,
    element: <Navigate to={indexRoutePath} replace />,
  },
  {
    path: 'mail',
    element: <Mail />,
  },
];
