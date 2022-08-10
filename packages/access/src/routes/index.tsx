import React from 'react';
import { Navigate } from 'react-router-dom';
import { get } from 'lodash';

import ListLayout from '../containers/Base/ListLayout';
import Workspaces from '../containers/Workspaces';
import Accounts from '../containers/Accounts';
import Roles from '../containers/Roles';

import { getAccessNavs } from '../utils/navs';

const navs = getAccessNavs();
const indexPath = get(navs, '[0].children[0].name');

export default [
  {
    path: '/access',
    element: <ListLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={indexPath} replace />,
      },
      {
        path: 'workspaces',
        element: <Workspaces />,
      },
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
