import React from 'react';
import SettingsLayout from '../containers/SettingsLayout';
import BaseInfo from '../containers/BaseInfo';

export default [
  {
    path: '/settings',
    element: <SettingsLayout />,
    children: [
      {
        path: 'base-info',
        element: <BaseInfo />,
      },
    ],
  },
];
