import { createGlobalStyle } from 'styled-components';
import { themeUtils } from '@kubed/components';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: ${({ theme }) => theme.palette.accents_1};
    color: #242e42;
  }
  
  a {
    color: ${({ theme }) => theme.palette.accents_8};
    
    &:hover {
      color: ${({ theme }) => themeUtils.getPrimaryColor(theme, true)};
    }
  }
  
  ::selection {
    background-color: #369a6a;
    color: #fff;
  }
  
  strong {
    font-weight: 500;
  }
  
  .kubed-icon__coloured {
    color: #00aa72;
    fill: #90e0c5;
  }
`;

export default GlobalStyles;
