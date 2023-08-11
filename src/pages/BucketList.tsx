import { styled } from 'styled-components';
import { Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import useGetBucketList from '../hooks/getBucketList';
import { tagColors } from '../styles/customStyles';
import WriteAPostButton from '../components/Home/BucketList/WriteAPostButton';
import useGetCurrentUser from '../hooks/getCurrentUser';
import Header from '../components/Layout/Header';
import Categories from '../components/Home/Categories/Categories';
const BucketList = () => {
  const { data: currentUser = null } = useGetCurrentUser(); // 유저 정보 가져오기 (새로고침했을 때, 현재 유저 정보가 없는 것을 보완)
  const params = useParams().userId;
  const bucketListData = useGetBucketList(params as string, null);
  const data: Array<BucketList> | null | undefined =
    bucketListData.data?.bucket_list;
  // 상세 선택
  const navigate = useNavigate();

  const handleChooseBucket = (id: number) => {
    navigate(`/userId/${params}/bucket-list/${id}`);
  };

  const content = (
    <>
      <S.bucketListContainer>
        {data?.map((el) => (
          <div key={el.id}>
            <S.bucketContainer onClick={() => handleChooseBucket(el.id)}>
              <S.bucketFirstLineContainer>
                <h1>{el.title}</h1>
                <p>
                  {el.categories.map((tag) => (
                    <Tag key={tag} bordered={false} color={tagColors[`${tag}`]}>
                      {tag}
                    </Tag>
                  ))}
                </p>
              </S.bucketFirstLineContainer>
              <S.bucketSecondLineContainer>
                <p>{el.created_at}</p>
              </S.bucketSecondLineContainer>
            </S.bucketContainer>
          </div>
        ))}
      </S.bucketListContainer>
    </>
  );
  return (
    <>
      <Main>
        <Header user={currentUser} />
        <Categories />
        <WriteAPostButton />
        {content}
      </Main>
    </>
  );
};

export default BucketList;

const Main = styled.main`
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const S = {
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
