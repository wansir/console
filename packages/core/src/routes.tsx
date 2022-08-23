/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import BaseLayout from './components/layouts/Base';
import Login from './containers/session/Login';
import LoginConfirm from './containers/session/LoginConfirm';
import PasswordConfirm from './containers/session/PasswordConfirm';
import Marketplace from './containers/component/Marketplace';
import MarketplaceDetail from './containers/component/Marketplace/Detail';

const baseRoutes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  { path: '/login/confirm', element: <LoginConfirm /> },
  { path: '/password/confirm', element: <PasswordConfirm /> },
];

const homePage = globals.config.homePage || '/dashboard';

const mergeRoutes = (routes: RouteObject[]) => {
  const pages = {
    path: '/',
    element: <BaseLayout />,
    children: [
      ...routes,
      { path: '/components', element: <Marketplace /> },
      { path: '/components/:componentId', element: <MarketplaceDetail /> },
      {
        index: true,
        element: <Navigate to={homePage} replace />,
      },
    ],
  };
  return [pages, ...baseRoutes];
};

export default mergeRoutes;
