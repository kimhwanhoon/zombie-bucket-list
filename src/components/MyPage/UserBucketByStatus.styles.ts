import styled from 'styled-components';

export const S = {
  BodyColor: styled.div`
    background-color: var(--color-bg);
    height: 100%;
  `,

  BucketContainer: styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    margin-top: 20px;
    border-bottom: 2px solid var(--color-primary);
    color: var(--color-text);
  `,

  BucketStatusTitle: styled.h2`
    font-size: 20px;
    color: var(--color-text);
  `,

  BucketStatusBox: styled.div`
    display: flex;
  `,

  BucketTotalCount: styled.p`
    margin: 30px 0;
  `,

  BucketTotalCountNumber: styled.span`
    font-size: 50px;
    color: var(--color-text);
  `,

  BucketStatusListBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 50px;
  `,

  BucketStatusListTitle: styled.p`
    margin-bottom: 15px;

    color: ${({ datatype }) => {
      switch (datatype) {
        case 'beforeStart':
          return '#F02121';
        case 'inProgress':
          return '#EB8D00';
        case 'done':
          return '#039F00';
        default:
          return 'black';
      }
    }};
  `,

  BucketStatusListCount: styled.p`
    color: var(--color-text);
  `,

  BucketStatusListCountNumber: styled.span`
    font-size: 40px;
    margin-left: 5px;
    color: var(--color-text);
  `,
};
