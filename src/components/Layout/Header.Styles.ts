import styled from 'styled-components';

export const S = {
  Header: styled.header`
    padding: 13px;
    background-color: var(--color-accent);
    display: flex;
    justify-content: space-between;
    height: 75px;
    color: var(--color-bg);
    font-weight: 600;
    align-items: center;
  `,

  UserDiv: styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
  `,

  UserImage: styled.div`
    background: #ffffff;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    overflow: hidden;
    background-color: black;
    cursor: pointer;

    img {
      width: 36px;
      height: 36px;
      object-fit: cover;
    }
  `,

  LogOutButton: styled.button`
    background-color: var(--color-primary);
    border: none;
    padding: 8px;
    cursor: pointer;
    color: var(--color-text);
    font-weight: 600;
    border-radius: 8px;

    &:hover {
      background-color: var(--color-text);
      color: var(--color-bg);
    }
  `,

  HeaderLogo: styled.div`
    cursor: pointer;
  `,
};
