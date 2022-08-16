import React from 'react';
import { StatusDot } from '@kubed/components';

import type { StatusIndicatorProps } from './types';
import { getStatusDotColor } from './utils';

const StatusIndicator = ({ type, color: colorProp, ...rest }: StatusIndicatorProps) => {
  const color = getStatusDotColor({ type, color: colorProp });

  return <StatusDot color={color} {...rest} />;
};

export default StatusIndicator;
