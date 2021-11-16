import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: ${({ theme }) => theme.palette.accents_1};
    color: #242e42;
  }
  
  ::selection {
    background-color: #369a6a;
    color: #fff;
  }
  
  .kubed-icon__coloured {
    color: #00aa72;
    fill: #90e0c5;
  }
`;

export default GlobalStyles;
