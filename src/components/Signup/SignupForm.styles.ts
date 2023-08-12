import { Button, Input } from 'antd';
import styled from 'styled-components';

export const S = {
  SignUpContainer: styled.div`
    /* width: 100vw;
    height: 100vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  SignUpTitle: styled.h2`
    margin-bottom: 30px;
  `,

  SignUpForm: styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-width: 50vw;
    height: 450px;
    background-color: var(--color-bg);
    border: 3px solid var(--color-accent);
    border-radius: 10px;
    padding: 20px 10px;
  `,

  SignUpImageInputWrapper: styled.div`
    display: flex;
    min-width: 100%;
    justify-content: space-around;
    align-items: center;
  `,

  SignUpImageContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    min-width: 50%;
  `,

  SignUpInputWrapper: styled.div`
    height: 90%;
    min-width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 15px;
  `,

  SignUpImageBox: styled.div`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    margin: 10px 0;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `,

  SignUpImageText: styled.label`
    margin: 10px 0;
    /* font-weight: bold; */
    color: var(--color-accent);
    cursor: pointer;
  `,

  Input: styled(Input)`
    max-width: 350px;
    min-width: 300px;
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
    max-width: 350px;
    min-width: 300px;
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

  Button: styled(Button)`
  /* background-color: var(--color-primary); */
  color: var(--color-text);
  font-weight: 900;
  height: 50px;
  width: 84%;

  &:hover {
    color: var(--color-accent) !important;
    border-color: var(--color-accent) !important;
  }
  `,

  ErrorMessage: styled.span`
    font-size: 14px;
    font-weight: bold;
    color: var(--color-accent);
  `
}