import React from 'react';
import App from '../App';
import Demo from '../containers/Demo';

export default [
  {
    path: '/demo',
    element: <Demo />,
  },
  {
    path: '/clusters/:cluster/demo',
    element: <App />,
  },
];
