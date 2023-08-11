import { Button } from 'antd';
import styled from 'styled-components';

export const S = {
  AuthContainer: styled.div`
    width: 100vw;
    height: 100vh;
    background-color: var(--color-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  `,

  AuthCheckUserContentBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    min-width: 200px;
  `,

  AuthCheckUserText: styled.span`
    color: var(--color-white);
  `,

  Button: styled(Button)`
  background-color: rgba(255,255,255, 0.8);
  color: var(--color-text);
  font-weight: 900;
  margin-left: 20px;
  

  &:hover {
    color: var(--color-accent) !important;
    border-color: var(--color-accent) !important;
  }
  `,
  
  RedBox: styled.div`
    width: 100vw;
    height: 50vh;
    background-color: var(--color-accent);
    position: absolute;
    bottom: 0;
  `,

  AbsoluteBox: styled.div`
    position: absolute;
    z-index: 1;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
  `
}