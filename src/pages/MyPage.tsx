import { useState, useEffect } from 'react';
import supabase from '../api/supabase';
import UserInfo from '../components/MyPage/UserInfo';
import { User } from '@supabase/supabase-js';
import Header from '../components/Layout/Header';
// import { useNavigate } from 'react-router-dom';

type Props = {};
const MyPage = (props: Props) => {
  // const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 현재 유저 정보
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  // TODO: 마운트 될 때 잠깐 User 정보가 안 들어왔다가 들어오는 이슈 있음
  // TODO: 유저 없을 경우 auth 페이지로 이동하게 하기
  // const handleUserAuthMove = () => {
  //   alert('유저 정보가 없습니다. 먼저 로그인해주세요!');
  //   navigate('/auth');
  // };

  return (
    <>
      <Header user={currentUser} />
      <UserInfo user={currentUser} />
    </>
  );
};

export default MyPage;
