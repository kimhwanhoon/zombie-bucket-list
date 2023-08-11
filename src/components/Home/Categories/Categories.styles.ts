import { Tabs } from 'antd';
import { styled } from 'styled-components';

export const S = {
  Tabs: styled(Tabs)`
    margin: 1rem;
  `,

  bucketListContainer: styled.div`
    padding: 5rem 2rem 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  `,
  bucketContainer: styled.div`
    width: 500px;
    border-radius: 8px;
    box-shadow: 1px 1px 8px 1px #e3e3e4;
    background-color: #fff;
    height: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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
    justify-content: flex-start;
    padding: 0 2rem;
    color: #8e8e8e;
  `,
};
