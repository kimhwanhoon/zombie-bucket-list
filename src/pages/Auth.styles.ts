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
  `,

  AuthContentBox: styled.div`
    display: flex;
    width: 230px;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  `
}