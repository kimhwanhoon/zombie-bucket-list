import useGetBucketList from '../hooks/getBucketList';
import useGetCurrentUser from '../hooks/getCurrentUser';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  SmileOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../api/supabase';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import EditPostModal from '../components/Home/BucketList/modal/EditPostModal';
import { useDispatch, useSelector } from 'react-redux';
import { editModalToggler } from '../redux/modules/editPostModalToggler';
import { Button, Divider, Popconfirm, Slider, message } from 'antd';
import { tagColors } from '../styles/customStyles';
import useGetWriter from '../hooks/getWriter';
import {
  S,
  StatusDivider,
  StyledProgress,
  StyledTag,
  StyledUserOutlined,
} from '../styles/bucketDetail.styles';

interface PostUser {
  nickname: string;
  profileImage: string;
}

const BucketDetail = () => {
  useGetCurrentUser(); // 유저 정보 가져오기 (새로고침했을 때, 현재 유저 정보가 없는 것을 보완)
  const { userId, postId } = useParams();
  const navigate = useNavigate();
  const editToggle = useSelector((state: State) => state.editModalToggle);
  const dispatch = useDispatch();
  const [statusValue, setStatusValue] = useState<number>(0);
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchViewCount,
    isSuccess,
  } = useGetBucketList!(userId as string, postId as string);
  // 글의 유저 정보 가져오기
  const [postUser, setPostUser] = useState<PostUser | null>(null);

  const {
    data: postUserData,
    isStale: isPostUserDataStale,
    refetch: refetchPostUser,
  } = useGetWriter(userId!);

  useEffect(() => {
    if (isPostUserDataStale) {
      refetchPostUser();
    }
  }, [isPostUserDataStale, refetchPostUser]);
  // 조회수 늘리기
  useEffect(() => {
    if (isSuccess) {
      viewCounter();
    }
  }, []);
  useEffect(() => {
    if (postUserData) setPostUser(postUserData[0]);
  }, [postUserData]);

  // 수정하기
  useEffect(() => {
    if (data && targetPost.length > 0) {
      switch (targetPost[0].status) {
        case '시작전': {
          setStatusValue(0);
          break;
        }
        case '진행중': {
          setStatusValue(50);
          break;
        }
        case '완료': {
          setStatusValue(100);
          break;
        }
      }
    }
  }, [data]);
  // 삭제하기
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('bucketList')
        .delete()
        .eq('id', postId);
      message.success('삭제 완료!');
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

  // 삭제하기 함수를 디바운싱하는 함수를 useCallaback에 넣기
  const handleDelete = useCallback(
    debounce(() => mutation.mutate(), 300),
    [],
  );
  //
  if (isLoading) {
    return <>로딩중...</>;
  }

  if (isError || data.bucket_list === null || !data.bucket_list) {
    return (
      <div>
        에러가 발생했습니다.{' '}
        <button onClick={() => navigate('')}>홈으로 돌아가기</button>
      </div>
    );
  }

  const targetPost = data.bucket_list.filter(
    (post) => post.id.toString() === postId,
  );
  const {
    categories,
    content,
    created_at,
    photoURL = 'https://media.tenor.com/X3ZCzdwffvMAAAAi/pvz-zombie.gif',
    title,
    viewCount,
    uuid,
  } = targetPost[0];
  const finalPhotoURL =
    photoURL || 'https://media.tenor.com/X3ZCzdwffvMAAAAi/pvz-zombie.gif';

  const viewCounter = async () => {
    if (typeof viewCount === 'number') {
      await supabase
        .from('bucketList')
        .update({ viewCount: viewCount + 1 })
        .eq('uuid', uuid);
      refetchViewCount();
    }
  };
  // 삭제하기
  const deleteConfirmHandler = () => {
    handleDelete();
    message.success('삭제되었습니다.');
  };

  const deleteCancelHandler = () => {
    message.error('삭제 취소하였습니다.');
  };

  return (
    <S.main>
      {editToggle && <EditPostModal />}
      <img
        id="back-button"
        src="https://i.ibb.co/YTDTd2t/icons8-back-100.png"
        alt="back"
        onClick={() => navigate(`/userId/${userId}/bucket-list`)}
      />
      <S.detailContainer>
        <S.leftContainer>
          <S.postDetails>
            <h1>{title}</h1>
            <p>{content}</p>
          </S.postDetails>
          <Divider></Divider>
          <S.photoLibrary>
            <img src={finalPhotoURL} alt="" />
          </S.photoLibrary>
        </S.leftContainer>
        <S.rightContainer>
          <S.iconContainer
            style={{ position: 'absolute', top: '1.1rem', right: '1.1rem' }}
          >
            <EditOutlined
              style={{
                fontSize: '1.25rem',
                cursor: 'pointer',
              }}
              onClick={() => dispatch(editModalToggler(true))}
            />

            <Popconfirm
              title="버킷리스트 삭제"
              description="정말 삭제하시겠습니까?"
              onConfirm={deleteConfirmHandler}
              onCancel={deleteCancelHandler}
              okText="삭제"
              cancelText="취소"
            >
              <DeleteOutlined
                style={{
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                }}
              />
            </Popconfirm>
          </S.iconContainer>
          <S.postStatsContainer>
            <S.postStatsElementContainer>
              <SmileOutlined />
              <S.postStatsElement>
                <span>조회수:</span>
                <span>{viewCount}</span>
              </S.postStatsElement>
            </S.postStatsElementContainer>
            <S.postStatsElementContainer>
              <CalendarOutlined />
              <S.postStatsElement>
                <span>작성일:</span>
                <span>{created_at}</span>
              </S.postStatsElement>
            </S.postStatsElementContainer>
            <S.postStatsElementContainer>
              <TagOutlined />
              <S.postStatsTagElement>
                <span>태그:</span>
                {categories.map((tag) => (
                  <StyledTag
                    key={tag}
                    bordered={false}
                    color={tagColors[`${tag}`]}
                  >
                    {tag}
                  </StyledTag>
                ))}
              </S.postStatsTagElement>
            </S.postStatsElementContainer>
            <S.statusContainer>
              <StatusDivider>진행 상태</StatusDivider>
              <Slider
                defaultValue={0}
                max={100}
                autoFocus
                keyboard
                dots
                tooltip={{ open: false }}
                marks={{ 0: '시작전', 50: '진행중', 100: '완료' }}
                value={statusValue}
                disabled
              />
              <S.progressContainer>
                <StyledProgress
                  type="circle"
                  percent={statusValue}
                  size={50}
                  strokeColor={{
                    '0%': '#e92727',
                    '100%': '#c12d2d',
                  }}
                  strokeWidth={8}
                />
                <span>
                  {statusValue === 0
                    ? '시작전'
                    : statusValue === 50
                    ? '시작이 반이다.'
                    : '완료'}
                </span>
              </S.progressContainer>
            </S.statusContainer>
          </S.postStatsContainer>
          <S.userDetailContainer>
            <S.userDetail>
              <StyledUserOutlined />
              <img src={postUser?.profileImage} alt="post user" />
              <span>{postUser?.nickname}</span>
            </S.userDetail>
          </S.userDetailContainer>
        </S.rightContainer>
      </S.detailContainer>
    </S.main>
  );
};

export default BucketDetail;
