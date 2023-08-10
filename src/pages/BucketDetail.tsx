import { styled } from 'styled-components';
import useGetBucketList from '../hooks/getBucketList';
import useGetCurrentUser from '../hooks/getCurrentUser';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../api/supabase';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

const BucketDetail = () => {
  useGetCurrentUser(); // 유저 정보 가져오기 (새로고침했을 때, 현재 유저 정보가 없는 것을 보완)
  const { userId, postId } = useParams();
  const navigate = useNavigate();
  const [deleteToggle, setDeleteToggle] = useState(false);

  const { data, isLoading, isError, error } = useGetBucketList!(
    userId as string,
    postId as string,
  );

  // 삭제하기
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('bucketList')
        .delete()
        .eq('id', postId);
      alert('삭제 완료!');
      if (error) console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bucketList'] });
      navigate(`/userId/${userId}/bucket-list/`);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 작성하기 함수를 디바운싱하는 함수를 useCallaback에 넣기
  const handleDelete = useCallback(
    debounce(() => mutation.mutate(), 300),
    [],
  );
  //
  if (isLoading) {
    return <>로딩중...</>;
  }

  if (isError) {
    return (
      <div>
        에러가 발생했습니다.{' '}
        <button onClick={() => navigate('')}>홈으로 돌아가기</button>
      </div>
    );
  }
  const targetPost: any = data.bucket_list!.filter(
    (post) => post.id.toString() === postId,
  );

  const {
    categories,
    content,
    created_at,
    photoURL,
    status,
    title,
    writer,
    viewCount,
    id,
  } = targetPost[0];

  const deleteModal = (
    <deleteModalStyle.container>
      <deleteModalStyle.titleContainer>
        <p>삭제하시겠습니까?</p>
      </deleteModalStyle.titleContainer>
      <deleteModalStyle.buttonContainer>
        <button onClick={() => handleDelete()}>삭제</button>
        <button onClick={() => setDeleteToggle(false)}>취소</button>
      </deleteModalStyle.buttonContainer>
    </deleteModalStyle.container>
  );
  return (
    <S.main>
      {deleteToggle && deleteModal}
      <img
        id="back-button"
        src="https://i.ibb.co/YTDTd2t/icons8-back-100.png"
        alt="back"
        onClick={() => navigate(`/userId/${userId}/bucket-list`)}
      />
      <S.detailContainer>
        <S.leftContainer>
          <S.iconContainer>
            <EditOutlined
              style={{
                fontSize: '1.25rem',
                cursor: 'pointer',
              }}
              onClick={() => setDeleteToggle(true)}
            />
            <DeleteOutlined
              style={{
                fontSize: '1.25rem',
                cursor: 'pointer',
              }}
              onClick={() => setDeleteToggle(true)}
            />
          </S.iconContainer>

          <div>
            <h1>{title}</h1>
            <p>{content}</p>
          </div>

          <S.photoLibrary>
            <img src={photoURL} alt="" />
          </S.photoLibrary>
        </S.leftContainer>
        <S.rightContainer>
          <S.postStatsContainer>
            <div className="post-stats-inside-container">
              <div>icon</div>
              <div className="post-stats-inside-right">
                <div>조회수</div>
                <div>{viewCount}</div>
              </div>
            </div>
            <div className="post-stats-inside-container">
              <div>icon</div>
              <div className="post-stats-inside-right">
                <div>상태</div>
                <div>{status}</div>
              </div>
            </div>
            <div className="post-stats-inside-container">
              <div>icon</div>
              <div className="post-stats-inside-right">
                <div>작성일</div>
                <div>{created_at}</div>
              </div>
            </div>
            <div className="post-stats-inside-container">
              <div>icon</div>
              <div className="post-stats-inside-right">
                <div>태그</div>
                <div>{categories}</div>
              </div>
            </div>
          </S.postStatsContainer>
          <S.userDetailContainer>
            <div className="post-stats-inside-container">
              <div>icon</div>
              <div className="post-stats-inside-right">
                <div>글쓴이</div>
                <div>{writer}</div>
              </div>
            </div>
          </S.userDetailContainer>
        </S.rightContainer>
      </S.detailContainer>
    </S.main>
  );
};

export default BucketDetail;

const S = {
  main: styled.main`
    position: relative;
    background-color: #f9fafb;
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30%;
    #back-button {
      position: absolute;
      top: 2rem;
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
    width: 100%;
    /* height: 30%; */
    display: flex;
    padding: 2rem;
    gap: 2rem;
    padding-top: 5rem;
  `,
  leftContainer: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    width: 60%;
    background-color: #fff;
    /* height: calc(600px + 1.5rem); */
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
  iconContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    position: 'absolute';
    top: '1.5rem';
    right: '1.5rem';
  `,
  photoLibrary: styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    height: 30%;
    margin-bottom: 1rem;
    img {
      border-radius: 10px;
    }
  `,
  rightContainer: styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    .post-stats-inside-container {
      display: flex;
      gap: 0.8rem;
    }

    .post-stats-inside-right {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
  `,
  postStatsContainer: styled.div`
    background-color: #fff;
    /* height: 400px; */
    border-radius: 15px;
    box-shadow: 0 0 5px 5px #f1f3f5;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
  userDetailContainer: styled.div`
    background-color: #fff;
    /* height: 200px; */
    border-radius: 15px;
    box-shadow: 0 0 5px 5px #f1f3f5;
    padding: 2rem;
  `,
};

const deleteModalStyle = {
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
