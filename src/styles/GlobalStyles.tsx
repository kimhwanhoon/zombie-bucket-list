import { createGlobalStyle } from 'styled-components';
import './reset.css';

const GlobalStyle = createGlobalStyle`

:root {
  --color-bg: #FBFBFB;
  --color-text: #160E0E;
  --color-accent: #C12D2D;
  --color-white: #FEFEFE;
  --color-primary: #D1CFCF
}

/* @font-face {
    font-family: 'CookieRun-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  * {
    font-family: 'CookieRun-Regular';
  } */

  body {
    background-color: var(--color-bg);
    /* font-family: 'CookieRun-Regular'; */
  }
`;

export default GlobalStyle;
