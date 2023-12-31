import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../api/supabase';
import { S } from './Header.Styles';
import { useQuery } from '@tanstack/react-query';
import { fetchUserDB } from '../../api/user';
import useGetCurrentUser from '../../hooks/getCurrentUser';

const Header = ({ queryClient }: queryClientProps) => {
  const { data: user } = useGetCurrentUser();
  const params = useParams().userId;
  const navigate = useNavigate();

  const {
    data: userData,
    isStale,
    refetch,
  } = useQuery(['userData'], async () => {
    try {
      if (user) return await fetchUserDB(user.email as string);
    } catch (error) {
      console.log(error);
    }
  });

  console.log('header-user : ', user);
  console.log('header-userData : ', userData);

  useEffect(() => {
    if (!userData && isStale) {
      refetch();
    }
  }, [user, userData, isStale, refetch]);

  //로그아웃 버튼
  const handleLogoutButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    localStorage.removeItem('token');
    const { error } = await supabase.auth.signOut();
    queryClient.removeQueries('userData');
    queryClient.removeQueries('currentUser');
    alert('로그아웃 되었습니다. 로그인 페이지로 이동합니다.');
    console.log('logout error: ', error);
    navigate('/auth');
  };

  //마이페이지로 이동 버튼
  const handleMypageMove = () => {
    navigate(`/userId/${params}/my-page/`);
  };

  //새로고침시
  return (
    <S.Header>
      <S.HeaderLogo
        onClick={() => {
          navigate('/');
        }}
      >
        좀비가 되기 전에 해야하는 100가지
      </S.HeaderLogo>
      {userData && (
        <S.UserDiv>
          <S.UserImage onClick={handleMypageMove}>
            <img src={userData[0].profileImage} alt="이미지오류" />
          </S.UserImage>
          <div>{userData[0].nickname}</div>
          <S.LogOutButton type="button" onClick={handleLogoutButtonClick}>
            로그아웃
          </S.LogOutButton>
        </S.UserDiv>
      )}
    </S.Header>
  );
};

export default Header;
