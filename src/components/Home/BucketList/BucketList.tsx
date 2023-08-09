import { styled } from 'styled-components';
import useGetBucketList from '../../../hooks/getBucketList';
import { Tag } from 'antd';
import { tagColors } from '../../../styles/customStyles';
import { useDispatch } from 'react-redux';
import { saveBucket } from '../../../redux/modules/detailBucketStore';
import { useNavigate } from 'react-router-dom';

const BucketList = () => {
  const bucketListData = useGetBucketList();
  const data: Array<BucketList> | null | undefined =
    bucketListData.data?.bucket_list;
  // 상세 선택
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChooseBucket = (id: number) => {
    const targetBucket = data?.filter((el) => el.id === id);
    if (targetBucket) dispatch(saveBucket(targetBucket as any));
    navigate(`/bucket-list/${id}`);
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
  return <>{content}</>;
};

export default BucketList;

const S = {
  bucketListContainer: styled.div`
    margin: 5rem 2rem 1rem 2rem;
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
