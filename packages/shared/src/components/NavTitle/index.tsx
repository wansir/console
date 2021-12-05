import React from 'react';
import styled from 'styled-components';
import { Field, DefaultProps, addColorAlpha, Tooltip } from '@kubed/components';

const Wrapper = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_8};
  box-shadow: 0 8px 16px 0 rgba(36, 46, 66, 0.2);

  .field-content {
    width: calc(100% - 55px);
  }

  .field-value {
    color: ${({ theme }) => theme.palette.background};
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.43;
    text-shadow: 0 4px 8px ${({ theme }) => addColorAlpha(theme.palette.accents_8, 0.1)};
  }

  .field-label {
    color: #d8dee5;
  }
`;

export interface NavTitleProps extends DefaultProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

const NavTitle = ({ icon, title = '', subtitle, ...rest }: NavTitleProps) => {
  const isOverLong = title.length > 8;
  return (
    <Wrapper {...rest}>
      {isOverLong ? (
        <Tooltip content={title} offset={[0, 13]} arrow={false}>
          <Field avatar={icon} label={subtitle} value={title} />
        </Tooltip>
      ) : (
        <Field avatar={icon} label={subtitle} value={title} />
      )}
    </Wrapper>
  );
};

export default NavTitle;
