import { UserOutlined } from '@ant-design/icons';
import { Divider, Progress, Tag } from 'antd';
import styled from 'styled-components';
import media from '../styles/media';

export const S = {
  main: styled.main`
    width: 100%;
    position: relative;
    background-color: var(--color-bg);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20%;
    #back-button {
      position: absolute;
      top: calc(2rem + 75px);
      left: 2rem;
      width: 32px;
      cursor: pointer;
      transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  `,
  detailContainer: styled.div`
    /* your CSS code for mobile first */
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
    gap: 2rem;
    padding-top: 10rem;
    ${media.greaterThan('lg')`
    flex-direction: row;
    width: 100%;
    height: 700px;
 `}
    ${media.greaterThan('lg')`
    max-width: 1000px;
 `}
  `,
  leftContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    align-items: center;
    width: 100%;
    background-color: #fff;
    gap: 1rem;
    border-radius: 15px;
    box-shadow: 0 0 5px 5px #f1f3f5;
    margin-bottom: -0.8rem;
    order: 2;
    ${media.greaterThan('lg')`
    height: 100%;
    width: 60%;
 `}
    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
    p {
      color: #555;
      line-height: 1.2;
    }
  `,
  postDetails: styled.div`
    height: 30%;
    width: 100%;
  `,
  iconContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  `,
  photoLibrary: styled.div`
    height: 70%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    width: 90%;
    margin-bottom: 1rem;
    background-size: contain;
    border-radius: 15px;
    img {
      border-radius: 10px;
      ${media.greaterThan('lg')`
    /* width: 100%; */
 `}
    }
  `,
  rightContainer: styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    order: 1;
    ${media.greaterThan('lg')`
    width: 40%;
    order: 2;
 `}
    .post-stats-inside-container {
      display: flex;
      gap: 0.8rem;
      width: 100%;
    }

    .post-stats-inside-right {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
  `,
  postStatsContainer: styled.div`
    background-color: #fff;
    height: 80%;
    border-radius: 15px;
    box-shadow: 0 0 5px 5px #f1f3f5;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    order: 2;
    ${media.greaterThan('lg')`
    order: 1;
 `}
  `,
  postStatsElementContainer: styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
  `,
  postStatsElement: styled.div`
    padding-top: 3px;
    display: flex;
    gap: 0.4rem;
  `,
  postStatsTagElement: styled.div`
    display: flex;
    align-items: center;
    span {
      margin-right: 0.6rem;
    }
  `,
  statusContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,

  progressContainer: styled.div`
    display: flex;
    gap: 1.25rem;
    align-items: center;
    padding-top: 1rem;
    /* justify-content: center; */
  `,
  userDetailContainer: styled.div`
    background-color: #fff;
    height: 20%;
    border-radius: 15px;
    box-shadow: 0 0 5px 5px #f1f3f5;
    padding: 2rem;
    order: 1;
    ${media.greaterThan('sm')`
    order: 2;
 `}
  `,
  userDetail: styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    img {
      border-radius: 100px;
      width: 28px;
      height: 28px;
    }
  `,
};

export const deleteModalStyle = {
  container: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: #f4eaea;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px #dfdada;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    justify-content: center;
    align-items: center;
  `,
  titleContainer: styled.div`
    font-size: 1.05rem;
    color: #333;
    letter-spacing: 0.2px;
  `,
  buttonContainer: styled.div`
    display: flex;
    width: 100%;
    gap: 1rem;
    :nth-child(1) {
      &:hover {
        background-color: #fafafa;
      }
    }
    :nth-child(2) {
      &:hover {
        background-color: #fafafa;
      }
    }
    > * {
      width: 100%;
      border: none;
      background-color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
    }
  `,
};

export const StatusDivider = styled(Divider)`
  margin: 0.25rem 0;
`;
export const StyledProgress = styled(Progress)``;
export const StyledTag = styled(Tag)`
  display: flex;
  justify-content: center;
`;
export const StyledUserOutlined = styled(UserOutlined)`
  margin-right: 0.75rem;
`;
