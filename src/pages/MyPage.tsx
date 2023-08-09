import { useState, useEffect } from 'react';
import supabase from '../api/supabase';
import UserInfo from '../components/MyPage/UserInfo';
import { User } from '@supabase/supabase-js';
import Header from '../components/Layout/Header';

type Props = {};
const MyPage = (props: Props) => {
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
  return (
    <>
      <Header user={currentUser} />
      <UserInfo user={currentUser} />
    </>
  );
};

export default MyPage;
