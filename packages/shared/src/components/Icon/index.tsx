import React from 'react';
import * as Icons from '@kubed/icons';
import { ucFirst } from '../../utils/string';

interface IconProps {
  name: string;
  color?: string;
  variant?: 'dark' | 'light' | 'coloured' | string;
  size?: number | string;
}

const Icon = ({ name, ...rest }: IconProps) => {
  // @ts-ignore
  const IconElement = Icons[ucFirst(name)];
  if (!IconElement) {
    throw new Error(`Icon with name: ${name} was not found!`);
  }
  return <IconElement {...rest} />;
};

export default Icon;
