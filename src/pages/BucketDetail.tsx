import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import useGetBucketList from '../hooks/getBucketList';

const BucketDetail = () => {
  useSelector((state) => console.log(state));
  // null이 나오기 때문에 맨 처음에 로드할 때 애초에 모든 데이터를 다 받아서
  // 해당하는 아이디만 param으로 불러와서 그걸로 filter를 걸어서 만들자
  const postId = useParams().id;

  const data = useGetBucketList().data?.bucket_list;
  console.log(data);
  const {
    categories,
    content,
    created_at,
    id,
    photoURL,
    status,
    title,
    userId,
    uuid,
    writer,
  } = (data as any).filter((post: any) => post.id === postId);
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
