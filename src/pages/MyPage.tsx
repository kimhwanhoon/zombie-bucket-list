import React from 'react';
import supabase  from '../api/supabase';

type Props = {};
const MyPage = (props: Props) => {
  // 현재 유저 확인
  const currentUser = async () =>  {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("현재 로그인한 유저는? ", user)
  }
  currentUser();

  return <div>MyPage</div>;
};

export default MyPage;
