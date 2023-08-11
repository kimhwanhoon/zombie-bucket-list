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
    position: fixed;
    width: 100%;
    top: 0;
  `,

  UserDiv: styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
  `,

  UserImage: styled.div`
    /* background: #ffffff; */
    height: 36px;
    width: 36px;
    border-radius: 50%;
    overflow: hidden;
    /* background-color: white; */
    cursor: pointer;

    img {
      width: 36px;
      height: 36px;
      object-fit: cover;
    }
  `,

  LogOutButton: styled.button`
    background-color: var(--color-accent);
    border: 1px solid var(--color-white);
    padding: 8px;
    cursor: pointer;
    color: var(--color-white);
    font-weight: 600;
    border-radius: 8px;

    &:hover {
      /* background-color: var(--color-text); */
      background-color: var(--color-white);
      color: var(--color-accent);
      transition: 0.2s ease-out;
    }
  `,

  HeaderLogo: styled.div`
    cursor: pointer;
  `,
};
