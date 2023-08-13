import { keyframes, styled } from 'styled-components';
import introBackground from '../../assets/zombies.gif';
import { Button } from 'antd';

const glitchAnim = keyframes`
0% {
    clip: rect(5px, 9999px, 41px, 0);
    transform: skew(0.01deg);
  }
  5% {
    clip: rect(7px, 9999px, 43px, 0);
    transform: skew(0.28deg);
  }
  10% {
    clip: rect(31px, 9999px, 15px, 0);
    transform: skew(0.04deg);
  }
  15% {
    clip: rect(27px, 9999px, 92px, 0);
    transform: skew(0.47deg);
  }
  20% {
    clip: rect(79px, 9999px, 71px, 0);
    transform: skew(0.1deg);
  }
  25% {
    clip: rect(13px, 9999px, 91px, 0);
    transform: skew(0.72deg);
  }
  30% {
    clip: rect(3px, 9999px, 93px, 0);
    transform: skew(0.92deg);
  }
  35% {
    clip: rect(50px, 9999px, 29px, 0);
    transform: skew(0.7deg);
  }
  40% {
    clip: rect(19px, 9999px, 1px, 0);
    transform: skew(0.85deg);
  }
  45% {
    clip: rect(70px, 9999px, 16px, 0);
    transform: skew(0.8deg);
  }
  50% {
    clip: rect(64px, 9999px, 37px, 0);
    transform: skew(0.82deg);
  }
  55% {
    clip: rect(86px, 9999px, 17px, 0);
    transform: skew(0.93deg);
  }
  60% {
    clip: rect(56px, 9999px, 69px, 0);
    transform: skew(0.11deg);
  }
  65% {
    clip: rect(50px, 9999px, 8px, 0);
    transform: skew(0.73deg);
  }
  70% {
    clip: rect(28px, 9999px, 27px, 0);
    transform: skew(0.2deg);
  }
  75% {
    clip: rect(40px, 9999px, 21px, 0);
    transform: skew(0.43deg);
  }
  80% {
    clip: rect(85px, 9999px, 37px, 0);
    transform: skew(0.42deg);
  }
  85% {
    clip: rect(20px, 9999px, 10px, 0);
    transform: skew(0.55deg);
  }
  90% {
    clip: rect(44px, 9999px, 93px, 0);
    transform: skew(0.71deg);
  }
  95% {
    clip: rect(96px, 9999px, 88px, 0);
    transform: skew(0.31deg);
  }
`;

const glitchAnim2 = keyframes`
0% {
    clip: rect(80px, 9999px, 29px, 0);
    transform: skew(0.42deg);
  }
  5% {
    clip: rect(12px, 9999px, 85px, 0);
    transform: skew(0.85deg);
  }
  10% {
    clip: rect(63px, 9999px, 20px, 0);
    transform: skew(0.34deg);
  }
  15% {
    clip: rect(71px, 9999px, 6px, 0);
    transform: skew(0.22deg);
  }
  20% {
    clip: rect(44px, 9999px, 41px, 0);
    transform: skew(0.26deg);
  }
  25% {
    clip: rect(93px, 9999px, 95px, 0);
    transform: skew(0.58deg);
  }
  30% {
    clip: rect(9px, 9999px, 70px, 0);
    transform: skew(0.47deg);
  }
  35% {
    clip: rect(1px, 9999px, 59px, 0);
    transform: skew(0.94deg);
  }
  40% {
    clip: rect(63px, 9999px, 47px, 0);
    transform: skew(0.57deg);
  }
  45% {
    clip: rect(20px, 9999px, 43px, 0);
    transform: skew(0.42deg);
  }
  50% {
    clip: rect(84px, 9999px, 25px, 0);
    transform: skew(0.73deg);
  }
  55% {
    clip: rect(50px, 9999px, 74px, 0);
    transform: skew(0.38deg);
  }
  60% {
    clip: rect(74px, 9999px, 45px, 0);
    transform: skew(0.89deg);
  }
  65% {
    clip: rect(84px, 9999px, 84px, 0);
    transform: skew(0.46deg);
  }
  70% {
    clip: rect(43px, 9999px, 56px, 0);
    transform: skew(0.33deg);
  }
  75% {
    clip: rect(9px, 9999px, 36px, 0);
    transform: skew(0.18deg);
  }
  80% {
    clip: rect(45px, 9999px, 41px, 0);
    transform: skew(0.79deg);
  }
  85% {
    clip: rect(85px, 9999px, 5px, 0);
    transform: skew(0.46deg);
  }
  90% {
    clip: rect(48px, 9999px, 3px, 0);
    transform: skew(0.28deg);
  }
  95% {
    clip: rect(6px, 9999px, 88px, 0);
    transform: skew(0.22deg);
  }
`;

const glitchSkew = keyframes`
0% {
    transform: skew(0deg);
  }
  10% {
    transform: skew(4deg);
  }
  20% {
    transform: skew(2deg);
  }
  30% {
    transform: skew(1deg);
  }
  40% {
    transform: skew(2deg);
  }
  50% {
    transform: skew(5deg);
  }
  60% {
    transform: skew(-4deg);
  }
  70% {
    transform: skew(4deg);
  }
  80% {
    transform: skew(-4deg);
  }
  90% {
    transform: skew(1deg);
  }
`;

export const S = {
  IntroWrapper: styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;

    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.7)
      ),
      url(${introBackground});
    background-size: cover;
    background-position: center;

    font-family: 'Arita-buri-SemiBold';

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  IntroText: styled.h2`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: var(--color-white);
    font-size: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  `,

  Button: styled(Button)`
    font-family: 'Arita-buri-SemiBold';
    margin: 2rem;
  `,

  AllSkipButton: styled(Button)`
    color: var(--color-white);
    font-family: 'Arita-buri-SemiBold';
    position: absolute;
    top: 0;
    right: 0;
    margin: 1.5rem;

    &:hover {
      font-weight: 600;
      color: var(--color-accent) !important;
      transition: color 0.3s ease-in-out;
    }
  `,

  SkipButton: styled(Button)`
    color: var(--color-white);
    font-family: 'Arita-buri-SemiBold';
    margin: 1.5rem;

    &:hover {
      font-weight: 600;
      color: var(--color-accent) !important;
      transition: color 0.3s ease-in-out;
    }
  `,

  BtnWrapper: styled.button`
    position: relative;
    margin-top: 30px;
    padding: 0 10px;
    line-height: 35px;
    color: var(--color-white);
    font-size: 1.2em;
    letter-spacing: 0.3em;
    text-align: center;
    animation: ${glitchSkew} 1s infinite linear alternate-reverse;
    background: var(--color-text);
    border: none;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
  `,

  GlitchBefore: styled.span`
    &::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      left: 2px;
      text-shadow: -2px 0 var(--color-accent);
      clip: rect(44px, 450px, 56px, 0);
      animation: ${glitchAnim} 5s infinite linear alternate-reverse;
    }
  `,

  GlitchAfter: styled.span`
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      left: -2px;
      text-shadow: -2px 0 var(--color-accent), 2px 2px var(--color-accent);
      clip: rect(44px, 450px, 56px, 0);
      animation: ${glitchAnim2} 5s infinite linear alternate-reverse;
    }
  `,
};
