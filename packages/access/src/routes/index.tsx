import React from 'react';

import ListLayout from '../containers/Base/ListLayout';
import Accounts from '../containers/Accounts';
import Roles from '../containers/Roles';

export default [
  {
    path: '/access',
    element: <ListLayout />,
    children: [
      {
        path: 'accounts',
        element: <Accounts />,
      },
      {
        path: 'roles',
        element: <Roles />,
      },
    ],
  },
];
