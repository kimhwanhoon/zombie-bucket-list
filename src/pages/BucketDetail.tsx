import { styled } from 'styled-components';
import useGetBucketList from '../hooks/getBucketList';
import useGetCurrentUser from '../hooks/getCurrentUser';
import { useNavigate, useParams } from 'react-router-dom';

const BucketDetail = () => {
  useGetCurrentUser(); // 유저 정보 가져오기 (새로고침했을 때, 현재 유저 정보가 없는 것을 보완)
  const { userId, postId } = useParams();
  const naviate = useNavigate();

  const { data, isLoading, isError, error } = useGetBucketList!(
    userId as string,
    postId as string,
  );

  if (isLoading) {
    return <>로딩중...</>;
  }

  if (isError) {
    return (
      <div>
        에러가 발생했습니다.{' '}
        <button onClick={() => naviate('')}>홈으로 돌아가기</button>
      </div>
    );
  }
  const targetPost = data.bucket_list![0];
  const {
    categories,
    content,
    created_at,
    id,
    photoURL,
    status,
    title,
    // userId,
    uuid,
    writer,
  } = targetPost;
  return (
    <S.main>
      <S.detailContainer>
        <S.leftContainer>
          <h1>{title}</h1>
          <p>{content}</p>
          <S.photoLibrary>
            <img src={photoURL} alt="" />
          </S.photoLibrary>
        </S.leftContainer>
        <S.rightContainer>
          <S.postStatsContainer>글 스탯 등 상세 정보</S.postStatsContainer>
          <S.userDetailContainer>유저 정보</S.userDetailContainer>
        </S.rightContainer>
      </S.detailContainer>
    </S.main>
  );
};

export default BucketDetail;

const S = {
  main: styled.main`
    background-color: #f9fafb;
    min-height: 100vh;
    width: 100%;
  `,
  detailContainer: styled.div`
    display: flex;
    margin: 2rem;
    gap: 2rem;
    margin-top: 5rem;
  `,
  leftContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    width: 60%;
    background-color: #fff;
    height: calc(600px + 1.5rem);
    border-radius: 15px;
    box-shadow: 0 0 5px 5px #f1f3f5;
    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    p {
      color: #555;
      line-height: 1.2;
    }
  `,
  photoLibrary: styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;

    height: 30%;
    content img {
      max-width: 90%;
      max-height: 50%;
      border-radius: 10px;
    }
  `,
  rightContainer: styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  postStatsContainer: styled.div`
    background-color: #fff;
    height: 400px;
    border-radius: 15px;
    box-shadow: 0 0 5px 5px #f1f3f5;
  `,
  userDetailContainer: styled.div`
    background-color: #fff;
    height: 200px;
    border-radius: 15px;
    box-shadow: 0 0 5px 5px #f1f3f5;
  `,
};
