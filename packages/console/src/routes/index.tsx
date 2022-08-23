import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';

const routes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
];

export default routes;
