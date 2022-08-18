import styled from 'styled-components';
import { Form, Text } from '@kubed/components';
import { Close } from '@kubed/icons';

export const StyledForm = styled(Form)`
  padding: 12px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled(Text)`
  margin: 0 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${props => props.theme.palette.accents_7};
`;

export const StyledCloseIcon = styled(Close)`
  border-radius: 50%;
  background-color: ${props => props.theme.palette.colors.red[2]};
`;
