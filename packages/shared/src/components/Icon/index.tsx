import React from 'react';
import * as Icons from '@kubed/icons';

export const toHumpName = (name: string): string => {
  return name.replace(/-(.)/g, g => g[1].toUpperCase());
};

export const toComponentName = (name: string): string => {
  const first = name.slice(0, 1).toUpperCase();
  const last = toHumpName(name.slice(1));
  return `${first}${last}`;
};

interface IconProps {
  name: string;
  color?: string;
  variant?: 'dark' | 'light' | 'coloured' | string;
  size?: number | string;
}

const Icon = ({ name, ...rest }: IconProps) => {
  // @ts-ignore
  const IconElement = Icons[toComponentName(name)];
  if (!IconElement) {
    throw new Error(`Icon with name: ${name} was not found!`);
  }
  return <IconElement {...rest} />;
};

export default Icon;
