import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../api/supabase';
import { S } from './Header.Styles';
import { User } from '@supabase/supabase-js';

const Header = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();

  // console.log("현재 user의 이메일:" ,user?.email)

  //user의 프로필,닉네임 정보 관리
  const [userProfile, setUserProfile] = useState<string>();
  const [userNickname, setUserNickname] = useState<string>();

  useEffect(() => {
    const fetchUserDB = async () => {
      // 현재 유저의 프로필URL과 nickname 가져오기
      const { data, error } = await supabase
        .from('users')
        .select('nickname, profileImage')
        .eq('email', user?.email);
      // console.log("users의 데이터 있나!!!",data)

      if (error) {
        alert(
          '사용자 정보를 가져오지 못하는 오류가 발생했습니다. 고객센터에 문의해주세요. error:header.',
        );
      } else {
        if (data && data.length > 0) {
          setUserNickname(data[0].nickname);
          setUserProfile(data[0].profileImage);
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

  // 회원가입 이동 버튼(유저가 없는 경우)
  const handleSignUpMovement = () => {
    navigate('/auth');
  };

  //마이페이지로 이동 버튼
  const handleMypageMove = () => {
    navigate('/my-page');
  };

  return (
    <S.Header>
      <div>logo</div>
      {user ? (
        <S.UserDiv>
          <S.UserImage onClick={handleMypageMove}>
            <img src={userProfile} alt="이미지오류" />
          </S.UserImage>
          <div>{userNickname}</div>
          <button type="button" onClick={handleLogoutButtonClick}>
            로그아웃
          </button>
        </S.UserDiv>
      ) : (
        <button onClick={() => handleSignUpMovement()}>회원가입</button>
      )}
    </S.Header>
  );
};

export default Header;
