import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { S } from './UserInfo.styles';
import supabase from '../../api/supabase';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();

  // 유저 정보 관리
  const [userProfile, setUserProfile] = useState<string>();
  const [userNickname, setUserNickname] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [userAbout, setUserAbout] = useState<string>();

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserDB = async () => {
      // 현재 유저의 프로필URL과 nickname 가져오기
      const { data, error } = await supabase
        .from('users')
        .select('nickname, profileImage, email, about')
        .eq('email', user?.email);
      console.log('users의 데이터 있나!!!', data);

      if (error) {
        alert('알 수 없는 오류가 발생했습니다. 고객센터에 문의해주세요.');
      } else {
        if (data && data.length > 0) {
          setUserNickname(data[0].nickname);
          setUserProfile(data[0].profileImage);
          setUserEmail(data[0].email);
          setUserAbout(data[0].about);
        }
      }
    };
    fetchUserDB();
  }, [user]);

  // console.log("현재 user 닉네임?",userNickname);
  // console.log("현재 user profileURL?",userProfile);

  //로그아웃 버튼
  const handleLogoutButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const { error } = await supabase.auth.signOut();

    navigate('/auth');
  };

  return (
    <div>
      {/* 내가 쓴 글 상태 보기 */}
      <S.BucketContainer>
        <div></div>
        <div>작성한 버킷리스트</div>
        <div>상태</div>
      </S.BucketContainer>

      {/* 내 정보 관리 */}
      <S.UserProfileContainer>
        <div>
          <S.UserImage>
            <img src={userProfile} />
          </S.UserImage>
          <div>{userNickname}</div>
        </div>
        <div>
          <div>email:{userEmail}</div>
          <div>자기소개:{userAbout}</div>
        </div>
      </S.UserProfileContainer>
      <div>
        <button>회원정보 수정</button>
        <button onClick={handleLogoutButtonClick}>로그아웃</button>
        <button>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default UserInfo;
