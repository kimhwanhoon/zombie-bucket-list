import { styled } from 'styled-components';
import useGetBucketList from '../../hooks/getBucketList';

const BucketList = () => {
  const bucketListData = useGetBucketList();
  const data: Array<BucketList> | null | undefined =
    bucketListData.data?.bucket_list;
  const content = (
    <S.ContentContainer>
      {data?.map((el) => (
        <div key={el.id}>
          <div>{el.categories}</div>
          <div>{el.content}</div>
          <div>{el.created_at}</div>
          <div>{el.writer}</div>
        </div>
      ))}
    </S.ContentContainer>
  );
  return <div>{content}</div>;
};

export default BucketList;

const S = {
  ContentContainer: styled.div``,
};
