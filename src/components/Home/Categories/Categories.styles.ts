import { Tabs } from 'antd';
import { styled } from 'styled-components';

export const S = {
  Tabs: styled(Tabs)`
    margin: auto;
    width: 100%;
    font-family: 'Pretendard-Regular';

    .ant-tabs-nav-wrap {
      display: flex;
      justify-content: center;
    }
  `,

  bucketListContainer: styled.div`
    height: calc(100vh - 155px);
    /* overflow: auto; */
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  `,

  bucketContainer: styled.div`
    width: 500px;
    border-radius: 8px;
    box-shadow: 1px 1px 8px 1px #e3e3e4;
    background-color: #fff;
    height: 6.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    gap: 1rem;
    cursor: pointer;
  `,

  bucketFirstLineContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    h1 {
      font-weight: 500;
      font-size: 1.1rem;
      letter-spacing: 0.25px;
    }
  `,

  bucketSecondLineContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    color: #8e8e8e;
    span {
      color: #555;
      font-weight: 600;
      letter-spacing: 0.35px;
    }
  `,
};
