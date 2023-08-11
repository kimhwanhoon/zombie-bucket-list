import { styled } from 'styled-components';
import { Button } from 'antd';
import introBackground from '../../assets/introBackground.jpg';

export const S = {
  IntroWrapper: styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;

    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ),
      url(${introBackground});
    background-size: cover;
    background-position: center;

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
    margin: 1rem;
  `,

  AllSkipButton: styled(Button)`
    color: var(--color-white);
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
    margin: 1rem;

    &:hover {
      font-weight: 600;
      color: var(--color-accent) !important;
      transition: color 0.3s ease-in-out;
    }
  `,
};
