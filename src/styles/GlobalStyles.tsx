import { createGlobalStyle } from 'styled-components';
import './reset.css';
// import bucketBackground from '../assets/zombies1.jpg';

const GlobalStyle = createGlobalStyle`

:root {
  --color-bg: #FBFBFB;
  --color-text: #160E0E;
  --color-accent: #C12D2D;
  --color-white: #FEFEFE;
  --color-primary: #D1CFCF
}

/* 인트로 폰트 */
@font-face {
    font-family: 'Arita-buri-SemiBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Arita-buri-SemiBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  * {
    /* font-family: 'Arita-buri-SemiBold'; */
  } 
  
  body {
    background-color: var(--color-bg);
    min-width: 590px;
    color: var(--color-text); 
  }
`;

export { GlobalStyle };
