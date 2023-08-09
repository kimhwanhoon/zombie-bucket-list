import { styled } from 'styled-components';
import { Button } from 'antd';
import introBackground from '../../assets/introBackground.jpg';

export const S = {
  IntroWrapper: styled.h2`
    width: 100vw;
    height: 100vh;
    font-size: 17px;

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
    color: white;
    font-size: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  `,

  Button: styled(Button)`
    margin: 1rem;
  `,
};
