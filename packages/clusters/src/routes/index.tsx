import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Clusters from '../containers/Clusters';
import BaseLayout from '../containers/Base/BaseLayout';
import ListLayout from '../containers/Base/ListLayout';

import CustomResources from '../containers/CustomResources';

const PATH = '/clusters/:cluster';

const routes: RouteObject[] = [
  {
    path: '/clusters',
    element: <Clusters />,
  },
  {
    path: PATH,
    element: <BaseLayout />,
    children: [
      {
        element: <ListLayout />,
        children: [
          {
            path: `${PATH}/customresources`,
            element: <CustomResources />,
          },
        ],
      },
    ],
  },
];

export default routes;
