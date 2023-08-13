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

/* 전체 폰트 적용 */
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

  * {
    font-family: 'Pretendard-Regular';
  } 
  
  body {
    background-color: var(--color-bg);
    color: var(--color-text); 
    font-family: 'Pretendard-Regular';
  }
`;

export { GlobalStyle };
