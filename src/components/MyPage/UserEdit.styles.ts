import { Button } from 'antd';
import { styled } from 'styled-components';

export const S = {
  UserImageUpload: styled.div`
    text-align: center;
    margin-right: 80px;
  `,

  UserProfileContainer: styled.div`
    margin-top: 10px;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 30px;
  `,

  UserImage: styled.div`
    background: #ffffff;
    height: 130px;
    width: 130px;
    border-radius: 50%;
    overflow: hidden;
    background-color: white;
    margin-bottom: 17px;

    img {
      width: 130px;
      height: 130px;
      object-fit: cover;
    }
  `,

  UserImageButton: styled.label`
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 7px;
    text-align: center;
    font-size: 10px;
    background-color: var(--color-primary);
    color: var(--color-text);
    font-weight: 600;

    &:hover {
      color: var(--color-bg);
    }
  `,

  UserLabel: styled.label`
    font-weight: 600;
    color: var(--color-text);
  `,

  MypageEditButton: styled.div`
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
  UserAboutBox: styled.div`
    margin-bottom: 10px;
  `,

  UserAbout: styled.div`
    margin-top: 22px;
    color: var(--color-text);
  `,
};
