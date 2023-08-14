import styled from 'styled-components';
import { Button } from 'antd';

export const S = {
  main: styled.main`
    width: 100%;
  `,

  UserProfileContainer: styled.div`
    margin-top: 15px;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 30px;
    background-color: var(--color-bg);
    padding-top: 80px;
  `,

  UserImage: styled.div`
    background: #ffffff;
    height: 130px;
    width: 130px;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--color-primary);
    margin-bottom: 17px;

    img {
      width: 130px;
      height: 130px;
      object-fit: cover;
    }
  `,

  UserImgNickname: styled.div`
    margin-right: 80px;
  `,

  UserNickname: styled.div`
    text-align: center;
    color: var(--color-text);
  `,

  UserEmailBox: styled.div`
    margin-bottom: 36px;
  `,

  UserLabel: styled.label`
    font-weight: 600;
    color: var(--color-text);
  `,

  UserEmail: styled.div`
    margin-top: 22px;
    color: var(--color-text);
  `,

  UserAbout: styled.pre`
    margin-top: 22px;
    line-height: 22px;
    color: var(--color-text);
  `,

  MypageButtonBox: styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 30px;
  `,

  Button: styled(Button)`
    background-color: var(--color-primary);
    color: var(--color-text);
    font-weight: 600;

    &:hover {
      color: var(--color-accent);
      border-color: var(--color-accent);
    }
  `,
  
  ButtonOut: styled(Button)`
    background-color: var(--color-accent);
    color: var(--color-bg);
    font-weight: 600;
    &:hover {
      color: var(--color-accent);
    }
  `,
};
