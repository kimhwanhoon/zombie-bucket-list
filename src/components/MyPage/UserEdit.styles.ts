import { styled } from 'styled-components';

export const S = {
  BucketContainer: styled.div`
    border: 2px solid black;
    margin-top: 20px;
    padding: 30px;
  `,

  UserProfileContainer: styled.div`
    border: 2px solid black;
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
    background-color: black;

    img {
      width: 130px;
      height: 130px;
      object-fit: cover;
    }
  `,
};
