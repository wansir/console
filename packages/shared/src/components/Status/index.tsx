import React from 'react';
import { StatusDot } from '@kubed/components';

import type { StatusProps } from './types';
import { getColor } from './utils';

const Status = ({ type, color: colorProp, ...rest }: StatusProps) => {
  const color = getColor({ type, color: colorProp });

  return <StatusDot color={color} {...rest} />;
};

export type { StatusProps };

export default Status;
