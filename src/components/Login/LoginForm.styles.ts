import { Button, Input } from 'antd';
import { styled } from 'styled-components';

export const S = {
  LoginContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  LoginTitle: styled.h2`
    margin-bottom: 30px;
  `,

  WelcomeText: styled.p`
    font-weight: bold;
    font-size: 30px;
  `,

  LoginForm: styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-width: 35vw;
    height: 450px;
    background-color: var(--color-bg);
    border: 3px solid var(--color-accent);
    border-radius: 10px;
    padding: 20px 10px;
  `,

  LoginInputWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 70%;
    width: 100%;
  `,

  LoginInputInnerWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    height: 50%;
  `,

  LoginButtonAndErrorMessageWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  Button: styled(Button)`
    color: var(--color-text);
    font-weight: 900;
    height: 50px;
    width: 70%;

    &:hover {
      color: var(--color-accent) !important;
      border-color: var(--color-accent) !important;
    }

    &:focus {
      border-color: var(--color-accent) !important;
      outline-color: var(--color-accent) !important;
    }
  `,

  Input: styled(Input)`
    width: 100%;
    height: 50px;

    &:hover {
      border-color: var(--color-accent) !important;
      outline-color: var(--color-accent) !important;
    }

    &:focus {
      border-color: var(--color-accent) !important;
      outline-color: var(--color-accent) !important;
    }
  `,

  PasswordInput: styled(Input.Password)`
    width: 100%;
    height: 50px;

    &:hover {
      border-color: var(--color-accent) !important;
      outline-color: var(--color-accent) !important;
    }
  `,

  ErrorMessage: styled.span`
    font-size: 14px;
    font-weight: bold;
    color: var(--color-accent);
    margin-bottom: 10px;
  `,
};
