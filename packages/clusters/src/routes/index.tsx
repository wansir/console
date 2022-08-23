import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Clusters from '../containers/Clusters';
import BaseLayout from '../containers/Base/BaseLayout';
import ListLayout from '../containers/Base/ListLayout';

import Overview from '../containers/Overview';
import CustomResources from '../containers/CustomResources';
import CustomResourcesDetail from '../containers/CustomResources/Detail';

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
            path: `${PATH}/overview`,
            element: <Overview />,
          },
          {
            path: `${PATH}/customresources`,
            element: <CustomResources />,
          },
        ],
      },
      {
        path: `${PATH}/customresources/:name`,
        element: <CustomResourcesDetail />,
      },
    ],
  },
];

export default routes;
