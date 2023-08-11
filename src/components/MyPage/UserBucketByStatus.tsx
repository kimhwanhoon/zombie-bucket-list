import { S } from './UserBucketByStatus.styles';
import useGetCurrentUser from '../../hooks/getCurrentUser';
import supabase from '../../api/supabase';
import { useEffect, useState } from 'react';

const UserBucketByStatus = () => {
  const [bucketListStatusList, setBucketListStatusList] = useState<
    string[] | null
  >(null);
  const [beforeStartCount, setBeforeStartCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const currentUser = useGetCurrentUser().data;
  const currentUserEmail = currentUser?.email;

  const fetchBucketListStatus = async () => {
    const { data } = await supabase
      .from('bucketList')
      .select('status')
      .eq('email', currentUserEmail);

    if (data) {
      const statusArray = data.map((item) => item.status);
      setBucketListStatusList(statusArray);
      const counts = statusCount(statusArray);
      setBeforeStartCount(counts.beforeStartCount);
      setInProgressCount(counts.inProgressCount);
      setDoneCount(counts.doneCount);
    } else {
      setBucketListStatusList(null);
    }
  };

  const statusCount = (statusArray: string[]) => {
    let beforeStartCount = 0;
    let inProgressCount = 0;
    let doneCount = 0;

    statusArray.forEach((status) => {
      if (status === '시작전') {
        beforeStartCount++;
      } else if (status === '진행중') {
        inProgressCount++;
      } else if (status === '완료') {
        doneCount++;
      }
    });
    return { beforeStartCount, inProgressCount, doneCount };
  };

  useEffect(() => {
    fetchBucketListStatus();
  }, [bucketListStatusList]);

  return (
    <S.BodyColor>
      <S.BucketContainer>
        <S.BucketStatusTitle>작성한 버킷리스트</S.BucketStatusTitle>
        <S.BucketTotalCount>
          <S.BucketTotalCountNumber>
            {bucketListStatusList?.length}
          </S.BucketTotalCountNumber>
          개
        </S.BucketTotalCount>
        <S.BucketStatusBox>
          <S.BucketStatusListBox>
            <S.BucketStatusListTitle datatype="beforeStart">
              시작 전
            </S.BucketStatusListTitle>
            <S.BucketStatusListCount>
              <S.BucketStatusListCountNumber>
                {beforeStartCount}
              </S.BucketStatusListCountNumber>
              개
            </S.BucketStatusListCount>
          </S.BucketStatusListBox>
          <S.BucketStatusListBox>
            <S.BucketStatusListTitle datatype="inProgress">
              진행 중
            </S.BucketStatusListTitle>
            <S.BucketStatusListCount>
              <S.BucketStatusListCountNumber>
                {inProgressCount}
              </S.BucketStatusListCountNumber>
              개
            </S.BucketStatusListCount>
          </S.BucketStatusListBox>
          <S.BucketStatusListBox>
            <S.BucketStatusListTitle datatype="done">
              완료
            </S.BucketStatusListTitle>
            <S.BucketStatusListCount>
              <S.BucketStatusListCountNumber>
                {doneCount}
              </S.BucketStatusListCountNumber>
              개
            </S.BucketStatusListCount>
          </S.BucketStatusListBox>
        </S.BucketStatusBox>
      </S.BucketContainer>
    </S.BodyColor>
  );
};

export default UserBucketByStatus;
