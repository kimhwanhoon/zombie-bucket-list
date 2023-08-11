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
    margin-right: 80px;
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

  UserEmail: styled.div`
    margin-top: 22px;
  `,

  UserAbout: styled.pre`
    margin-top: 22px;
    line-height: 22px;
  `,

  MypageButtonBox: styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 30px;
  `,
};
