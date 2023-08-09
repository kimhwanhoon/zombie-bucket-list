import { useState, useEffect } from 'react';
import supabase from '../api/supabase';
import Header from '../components/Layout/Header';
import Intro from '../components/Intro/Intro';
import { User } from '@supabase/supabase-js';
import { styled } from 'styled-components';
import BucketList from '../components/Home/BucketList/BucketList';
import FakeComponent from '../components/Home/FakeComponent';
import WriteAPostButton from '../components/Home/BucketList/WriteAPostButton';

const Home = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
    <Main>
      <Header user={currentUser} />
      <Intro />
      <FakeComponent />
      <WriteAPostButton />
      <BucketList />
    </Main>
  );
};

export default Home;

const Main = styled.main`
  background-color: #f8f8f8;
  min-height: 100vh;
`;
