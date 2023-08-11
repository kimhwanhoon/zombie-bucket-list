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
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 50px;
  `,

  SignUpForm: styled.form`
    display: flex;
    flex-direction: column;
    width: 60vw;
    background-color: var(--color-primary);
    border-radius: 10px;
    padding: 20px 10px;
  `,

  SignUpImageInputWrapper: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
  `,

  SignUpImageContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
  `,

  SignUpInputWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,

  SignUpImageBox: styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color:black;
    overflow: hidden;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `,

  SignUpImageText: styled.label`
    margin: 10px 0;
    font-weight: bold;
    color: var(--color-accent)
  `


}