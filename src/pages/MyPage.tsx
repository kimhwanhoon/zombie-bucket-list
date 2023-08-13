import { useState, useEffect } from 'react';
import supabase from '../api/supabase';
import UserInfo from '../components/MyPage/UserInfo';
import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { fetchUserDB } from '../api/user';

const MyPage = ({queryClient}:queryClientProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // 현재 유저 정보
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user || null);
    };
    fetchUser();

  }, []);

  console.log(currentUser?.email)
  const {data: userData} = useQuery(['userData'], async () => {
    const reponse = await fetchUserDB(currentUser?.email as string);
    console.log("Mypage!!!!! : ", reponse)
    return reponse;
  });

  console.log('myPage-currentUser', currentUser); //null
  console.log('myPage-userData', userData);

  // 잠깐 유저가 안들어와서 .. 유저정보가 없다고 그르네
  // TODO: 유저 없을 경우 auth 페이지로 이동하게 하기

  return (
    <>
      {/* <Header user={currentUser} /> */}
      <UserInfo user={currentUser} userData={userData as UserData} queryClient={queryClient}/>
    </>
  );
};

export default MyPage;
