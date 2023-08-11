import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../api/supabase';
import { S } from './Header.Styles';
import { useQuery } from '@tanstack/react-query';
import { fetchUserDB } from '../../api/user';
import useGetCurrentUser from '../../hooks/getCurrentUser';

const Header = () => {
  const { data: user } = useGetCurrentUser();
  const params = useParams().userId;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // user의 프로필,닉네임 정보 관리
  // const [userProfile, setUserProfile] = useState<string>();
  // const [userNickname, setUserNickname] = useState<string>();

  const {
    data: userData,
    isLoading,
    isError,
    error,
    isStale,
    refetch,
  } = useQuery(['userData'], async () => {
    console.log('user', user);
    try {
      if (user) return await fetchUserDB(user.email as string);
    } catch (error) {
      console.log(error);
    }
  });

  //
  //
  console.log('header data', userData);

  useEffect(() => {
    if (!userData && isStale) {
      refetch();
    }
  }, [user, userData, isStale, refetch]);
  console.log(user);

  //로그아웃 버튼
  const handleLogoutButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다. 로그인 페이지로 이동합니다.');
    const { error } = await supabase.auth.signOut();
    navigate('/auth');
  };

  //마이페이지로 이동 버튼
  const handleMypageMove = () => {
    navigate(`/userId/${params}/my-page/`);
  };

  //새로고침시
  return (
    <S.Header>
      <div>logo</div>
      {userData && (
        <S.UserDiv>
          <S.UserImage onClick={handleMypageMove}>
            <img src={userData[0].profileImage} alt="이미지오류" />
          </S.UserImage>
          <div>{userData[0].nickname}</div>
          <button type="button" onClick={handleLogoutButtonClick}>
            로그아웃
          </button>
        </S.UserDiv>
      )}
    </S.Header>
  );
};

export default Header;
