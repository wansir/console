import React from 'react';
import App from '../App';

const PATH = '/clusters/:cluster';

export default [
  {
    path: `${PATH}/demo`,
    element: <App />,
  },
];
