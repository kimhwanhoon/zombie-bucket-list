import styled from 'styled-components';

export const S = {
  UserProfileContainer: styled.div`
    margin-top: 15px;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 30px;
    background-color: var(--color-bg);
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
    margin-right: 40px;
  `,

  UserNickname: styled.div`
    text-align: center;
  `,

  UserEmailBox: styled.div`
    margin-bottom: 36px;
  `,

  UserLabel: styled.label`
    font-weight: 600;
  `,

  UserAbout: styled.div`
    margin-top: 25px;
  `,
};
