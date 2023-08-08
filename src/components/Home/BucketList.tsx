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
          {el.photoURL && <S.image src={el.photoURL} alt="bucketList-pic" />}
          <div>카테고리: {el.categories.join(', ')}</div>
          <div>제목: {el.title}</div>
          <div>내용: {el.content}</div>
          <div>작성일: {el.created_at}</div>
          <div>작성자: {el.writer}</div>
        </div>
      ))}
    </S.ContentContainer>
  );
  return <>{content}</>;
};

export default BucketList;

const S = {
  ContentContainer: styled.div``,
  image: styled.img`
    max-width: 200px;
    max-height: 200px;
  `,
};
